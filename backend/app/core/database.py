import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings

logger = logging.getLogger("bhasha.database")

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

db_instance = Database()

async def connect_to_mongo():
    if not settings.MONGODB_URI:
        logger.warning("MONGODB_URI is not set. MongoDB features will be disabled.")
        return

    try:
        db_instance.client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000,
        )
        db_instance.db = db_instance.client[settings.MONGODB_DB_NAME]
        
        # Test connection
        await db_instance.db.command("ping")
        logger.info(f"Connected to MongoDB database: {settings.MONGODB_DB_NAME}")

        # Ensure indexes
        await init_db_indexes()
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        logger.info("Closed MongoDB connection.")

async def init_db_indexes():
    if db_instance.db is None:
        return
    try:
        # 1. users: unique index on clerkUserId
        await db_instance.db.users.create_index("clerkUserId", unique=True)
        await db_instance.db.users.create_index("email")

        # 2. translation_history: indexed by clerkUserId and timestamp
        await db_instance.db.translation_history.create_index([("clerkUserId", 1), ("timestamp", -1)])

        # 3. saved_translations: indexed by clerkUserId and savedAt
        await db_instance.db.saved_translations.create_index([("clerkUserId", 1), ("savedAt", -1)])

        # 4. conversations: indexed by clerkUserId and updatedAt
        await db_instance.db.conversations.create_index([("clerkUserId", 1), ("updatedAt", -1)])

        logger.info("MongoDB collections and indexes initialized successfully.")
    except Exception as e:
        logger.warning(f"Error creating MongoDB indexes: {e}")

def get_database() -> AsyncIOMotorDatabase:
    return db_instance.db
