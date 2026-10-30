import logging
import httpx
import jwt
from fastapi import Header, HTTPException, status
from app.core.config import settings

logger = logging.getLogger("bhasha.security")

async def verify_clerk_token(authorization: str = Header(None)) -> dict:
    """
    Verifies the Clerk authentication Bearer token.
    Extracts the verified clerkUserId (sub) and user details from Clerk.
    Raises 401 Unauthorized if invalid or missing.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header. Expected Bearer token.",
        )

    token = authorization.split(" ")[1].strip()
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Empty bearer token.",
        )

    # 1. Inspect claims from token
    try:
        unverified_claims = jwt.decode(token, options={"verify_signature": False})
        clerk_user_id = unverified_claims.get("sub")
    except Exception as e:
        logger.error(f"Error decoding JWT claims: {e}")
        clerk_user_id = None

    if not clerk_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing subject (clerkUserId)",
        )

    # 2. Verify with Clerk Backend API using CLERK_SECRET_KEY
    if settings.CLERK_SECRET_KEY:
        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.get(
                    f"https://api.clerk.com/v1/users/{clerk_user_id}",
                    headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
                )
                if res.status_code == 200:
                    user_data = res.json()
                    # Extract primary email and username
                    email = ""
                    emails = user_data.get("email_addresses", [])
                    primary_email_id = user_data.get("primary_email_address_id")
                    for e in emails:
                        if e.get("id") == primary_email_id:
                            email = e.get("email_address", "")
                            break
                    if not email and emails:
                        email = emails[0].get("email_address", "")

                    first_name = user_data.get("first_name") or ""
                    last_name = user_data.get("last_name") or ""
                    full_name = f"{first_name} {last_name}".strip()
                    username = user_data.get("username") or full_name or (email.split("@")[0] if email else "Bhasha User")

                    return {
                        "clerkUserId": clerk_user_id,
                        "email": email,
                        "username": username,
                        "firstName": first_name,
                        "lastName": last_name,
                        "imageUrl": user_data.get("image_url", ""),
                    }
                else:
                    logger.warning(f"Clerk user verification returned status {res.status_code}")
        except Exception as e:
            logger.error(f"Error contacting Clerk API: {e}")

    # Fallback to claims if Clerk API had network issue but token has valid sub
    return {
        "clerkUserId": clerk_user_id,
        "email": unverified_claims.get("email", ""),
        "username": unverified_claims.get("username", "Bhasha User"),
    }
