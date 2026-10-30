from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.core.database import get_database
from app.core.security import verify_clerk_token

router = APIRouter(prefix="/api", tags=["auth_and_user"])

# ============================================================================
# PYDANTIC SCHEMAS
# ============================================================================

class UserPreferencesUpdate(BaseModel):
    preferredLanguage: Optional[str] = None
    languages: Optional[List[str]] = None
    preferences: Optional[Dict[str, Any]] = None

class TranslationHistoryCreate(BaseModel):
    sourceLanguage: str
    targetLanguage: str
    sourceText: str
    translatedText: str

class SavedTranslationCreate(BaseModel):
    sourceLanguage: str
    targetLanguage: str
    sourceText: str
    translatedText: str
    category: Optional[str] = "General"
    notes: Optional[str] = None

# ============================================================================
# AUTHENTICATION & USER SYNC ENDPOINTS
# ============================================================================

@router.post("/auth/sync")
async def sync_clerk_user(verified_clerk: dict = Depends(verify_clerk_token)):
    """
    Idempotent User Sync:
    Verifies the Clerk authentication token on the backend, extracts clerkUserId,
    finds or creates the user's profile in MongoDB, and returns their Bhasha profile.
    """
    db = get_database()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service unavailable",
        )

    clerk_user_id = verified_clerk["clerkUserId"]
    now = datetime.now(timezone.utc)

    # 1. Search for existing user document by verified clerkUserId
    user_doc = await db.users.find_one({"clerkUserId": clerk_user_id})

    if not user_doc:
        # 2. Create new Bhasha user profile in MongoDB
        new_user = {
            "clerkUserId": clerk_user_id,
            "username": verified_clerk.get("username") or "Bhasha User",
            "email": verified_clerk.get("email") or "",
            "preferredLanguage": "Hindi",
            "languages": ["Hindi", "English"],
            "preferences": {
                "theme": "dark",
                "voiceEnabled": True,
            },
            "createdAt": now,
            "updatedAt": now,
        }
        result = await db.users.insert_one(new_user)
        new_user["_id"] = str(result.inserted_id)
        return {"status": "created", "user": new_user}

    # 3. Update existing user's last active timestamp & any changed metadata
    update_data = {"updatedAt": now}
    if verified_clerk.get("email") and verified_clerk["email"] != user_doc.get("email"):
        update_data["email"] = verified_clerk["email"]
    if verified_clerk.get("username") and verified_clerk["username"] != user_doc.get("username"):
        update_data["username"] = verified_clerk["username"]

    await db.users.update_one({"clerkUserId": clerk_user_id}, {"$set": update_data})
    
    # Refresh doc
    updated_doc = await db.users.find_one({"clerkUserId": clerk_user_id})
    updated_doc["_id"] = str(updated_doc["_id"])
    return {"status": "synced", "user": updated_doc}

@router.get("/user/profile")
async def get_user_profile(verified_clerk: dict = Depends(verify_clerk_token)):
    """
    Returns the MongoDB profile of the verified authenticated user.
    """
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database service unavailable")

    user_doc = await db.users.find_one({"clerkUserId": verified_clerk["clerkUserId"]})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User profile not found in MongoDB")

    user_doc["_id"] = str(user_doc["_id"])
    return user_doc

@router.put("/user/preferences")
async def update_user_preferences(
    body: UserPreferencesUpdate,
    verified_clerk: dict = Depends(verify_clerk_token),
):
    """
    Updates the user's preferred language, language list, or application preferences.
    """
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database service unavailable")

    update_fields = {"updatedAt": datetime.now(timezone.utc)}
    if body.preferredLanguage is not None:
        update_fields["preferredLanguage"] = body.preferredLanguage
    if body.languages is not None:
        update_fields["languages"] = body.languages
    if body.preferences is not None:
        for k, v in body.preferences.items():
            update_fields[f"preferences.{k}"] = v

    await db.users.update_one(
        {"clerkUserId": verified_clerk["clerkUserId"]},
        {"$set": update_fields},
    )

    updated_doc = await db.users.find_one({"clerkUserId": verified_clerk["clerkUserId"]})
    updated_doc["_id"] = str(updated_doc["_id"])
    return {"status": "updated", "user": updated_doc}

# ============================================================================
# TRANSLATION HISTORY & SAVED TRANSLATIONS
# ============================================================================

@router.post("/user/history")
async def add_translation_history(
    body: TranslationHistoryCreate,
    verified_clerk: dict = Depends(verify_clerk_token),
):
    """
    Saves an audio/text translation session to user's MongoDB history.
    """
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database service unavailable")

    doc = {
        "clerkUserId": verified_clerk["clerkUserId"],
        "sourceLanguage": body.sourceLanguage,
        "targetLanguage": body.targetLanguage,
        "sourceText": body.sourceText,
        "translatedText": body.translatedText,
        "timestamp": datetime.now(timezone.utc),
    }

    result = await db.translation_history.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return {"status": "saved", "item": doc}

@router.get("/user/history")
async def get_translation_history(
    limit: int = 30,
    verified_clerk: dict = Depends(verify_clerk_token),
):
    """
    Retrieves the user's recent translation history from MongoDB.
    """
    db = get_database()
    if db is None:
        return []

    cursor = db.translation_history.find(
        {"clerkUserId": verified_clerk["clerkUserId"]}
    ).sort("timestamp", -1).limit(limit)

    items = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        items.append(doc)
    return items

@router.post("/user/saved")
async def save_translation_bookmark(
    body: SavedTranslationCreate,
    verified_clerk: dict = Depends(verify_clerk_token),
):
    """
    Pins or bookmarks a translation for permanent quick-reference.
    """
    db = get_database()
    if db is None:
        raise HTTPException(status_code=503, detail="Database service unavailable")

    doc = {
        "clerkUserId": verified_clerk["clerkUserId"],
        "sourceLanguage": body.sourceLanguage,
        "targetLanguage": body.targetLanguage,
        "sourceText": body.sourceText,
        "translatedText": body.translatedText,
        "category": body.category or "General",
        "notes": body.notes,
        "savedAt": datetime.now(timezone.utc),
    }

    result = await db.saved_translations.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return {"status": "bookmarked", "item": doc}

@router.get("/user/saved")
async def get_saved_translations(
    verified_clerk: dict = Depends(verify_clerk_token),
):
    """
    Retrieves all bookmarked translations for the verified user.
    """
    db = get_database()
    if db is None:
        return []

    cursor = db.saved_translations.find(
        {"clerkUserId": verified_clerk["clerkUserId"]}
    ).sort("savedAt", -1)

    items = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        items.append(doc)
    return items
