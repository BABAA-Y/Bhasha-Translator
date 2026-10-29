import os
import sys
from dotenv import load_dotenv

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Bhasha (भाषा) - Indic Voice Bridge"
    VERSION: str = "1.0.0"
    
    # Gnani AI Endpoints
    GNANI_API_KEY: str = os.getenv("GNANI_API_KEY", "")
    STT_URL: str = "https://api.vachana.ai/stt/v3"
    TTS_URL: str = "https://api.vachana.ai/api/v1/tts/inference"
    
    # LLM Keys
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    
    # Audio Specs
    SAMPLE_RATE: int = 16000
    TTS_SAMPLE_RATE: int = 24000

settings = Settings()
