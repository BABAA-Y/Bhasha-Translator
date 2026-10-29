import requests
from app.core.config import settings

def synthesize_speech(
    text: str,
    language_code: str = "hi",
    voice: str = "Shivani",
    speed: float = 1.0
) -> bytes:
    """
    Calls Gnani Timbre v3 TTS to synthesize Indian speech audio from text.
    """
    if not settings.GNANI_API_KEY:
        print("[WARNING] GNANI_API_KEY is not set in backend/.env")
        return b""

    headers = {
        "Content-Type": "application/json",
        "X-API-Key-ID": settings.GNANI_API_KEY
    }

    payload = {
        "text": text,
        "voice": voice,
        "model": "timbre-v3.0",
        "language": language_code,
        "speed": speed,
        "audio_config": {
            "sample_rate": settings.TTS_SAMPLE_RATE,
            "num_channels": 1,
            "sample_width": 2,
            "encoding": "linear_pcm",
            "container": "wav"
        }
    }

    try:
        response = requests.post(
            settings.TTS_URL,
            headers=headers,
            json=payload,
            timeout=(5, 40)
        )
        response.raise_for_status()
        return response.content
    except Exception as e:
        print(f"[ERROR] TTS Synthesis failed: {e}")
        raise
