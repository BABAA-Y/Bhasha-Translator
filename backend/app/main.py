from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.api.routes import router as speech_router
from app.api.auth_routes import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to MongoDB Atlas on startup
    await connect_to_mongo()
    yield
    # Clean up connection on shutdown
    await close_mongo_connection()

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="Modular production backend for Bhasha Voice AI",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Core Voice / Translation Endpoints
    app.include_router(speech_router)
    # Clerk Authentication Sync & MongoDB Application Data Endpoints
    app.include_router(auth_router)

    return app

app = create_app()
