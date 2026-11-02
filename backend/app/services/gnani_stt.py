import requests
from app.core.config import settings

PRISMA_STREAM_URL = "wss://api.vachana.ai/stt/v3/stream"

def format_gnani_lang(language_code: str) -> str:
    """Formats language code with -IN locale suffix expected by Gnani Prisma STT v3."""
    if "-IN" in language_code or language_code == "indic-auto":
        return language_code
    return f"{language_code}-IN"

def get_prisma_stream_headers(language_code: str) -> dict:
    """Generates connection headers for Gnani Prisma STT WebSocket streaming."""
    return {
        "X-API-Key-ID": settings.GNANI_API_KEY,
        "language_code": format_gnani_lang(language_code),
        "model": "prisma-v3.0",
        "format": "transcribe",
        "x-sample-rate": "16000",
        "x-partials": "true",
    }

def transcribe_speech(wav_bytes: bytes, language_code: str = "hi", filename: str = "speech.wav") -> str:
    """
    Calls Gnani Prisma STT (Vachana API v3) to transcribe 16kHz WAV audio.
    Falls back to Groq Whisper if Gnani is unreachable or encounters an error.
    """
    gnani_lang = format_gnani_lang(language_code)

    if settings.GNANI_API_KEY:
        headers = {
            "X-API-Key-ID": settings.GNANI_API_KEY
        }
        files = {
            "audio_file": (filename, wav_bytes, "audio/wav")
        }
        data = {
            "language_code": gnani_lang,
            "format": "transcribe"
        }

        try:
            response = requests.post(
                settings.STT_URL,
                headers=headers,
                files=files,
                data=data,
                timeout=(5, 30)
            )
            response.raise_for_status()
            result = response.json()
            transcript = result.get("transcript", "").strip()
            if transcript:
                return transcript
        except Exception as e:
            print(f"[WARNING] Gnani STT failed: {e}. Trying Groq Whisper fallback...")

    # Fallback to Groq Whisper v3 Turbo
    if settings.GROQ_API_KEY:
        try:
            from groq import Groq
            client = Groq(api_key=settings.GROQ_API_KEY)
            clean_lang = language_code.split("-")[0]
            whisper_res = client.audio.transcriptions.create(
                file=(filename, wav_bytes),
                model="whisper-large-v3-turbo",
                language=clean_lang if clean_lang in ["hi", "ta", "te", "kn", "bn", "mr", "gu", "en"] else None,
                response_format="text"
            )
            return str(whisper_res).strip()
        except Exception as groq_err:
            print(f"[ERROR] Groq Whisper fallback failed: {groq_err}")

    return ""
