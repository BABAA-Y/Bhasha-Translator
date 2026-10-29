import requests
from app.core.config import settings

def transcribe_speech(wav_bytes: bytes, language_code: str = "hi", filename: str = "speech.wav") -> str:
    """
    Calls Gnani Prisma STT (Vachana API v3) to transcribe 16kHz WAV audio.
    """
    if not settings.GNANI_API_KEY:
        print("[WARNING] GNANI_API_KEY is not set in backend/.env")
        return ""

    headers = {
        "X-API-Key-ID": settings.GNANI_API_KEY
    }
    files = {
        "audio_file": (filename, wav_bytes, "audio/wav")
    }
    data = {
        "language_code": language_code,
        "format": "transcribe"
    }

    try:
        response = requests.post(
            settings.STT_URL,
            headers=headers,
            files=files,
            data=data,
            timeout=(5, 40)
        )
        response.raise_for_status()
        result = response.json()
        return result.get("transcript", "").strip()
    except Exception as e:
        print(f"[ERROR] STT Transcription failed: {e}")
        raise
