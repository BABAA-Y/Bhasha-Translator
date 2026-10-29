import os
import sys
import requests
from dotenv import load_dotenv

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

STT_URL = "https://api.vachana.ai/stt/v3"
TTS_URL = "https://api.vachana.ai/api/v1/tts/inference"

class GnaniClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GNANI_API_KEY")
        if not self.api_key:
            print("[INFO] GNANI_API_KEY is not configured yet in .env")

    def _get_headers(self, content_type: str = None):
        headers = {
            "X-API-Key-ID": self.api_key or os.getenv("GNANI_API_KEY", "")
        }
        if content_type:
            headers["Content-Type"] = content_type
        return headers

    def speech_to_text(self, wav_bytes: bytes, filename: str = "audio.wav", language_code: str = "hi") -> str:
        """
        Sends 16kHz WAV audio bytes to Gnani Prisma STT and returns the transcription.
        """
        if not self.api_key:
            self.api_key = os.getenv("GNANI_API_KEY")

        files = {"audio_file": (filename, wav_bytes, "audio/wav")}
        data = {
            "language_code": language_code,
            "format": "transcribe"
        }

        response = requests.post(
            STT_URL,
            headers=self._get_headers(),
            files=files,
            data=data,
            timeout=(5, 45)
        )
        response.raise_for_status()
        res_json = response.json()
        transcript = res_json.get("transcript", "").strip()
        return transcript

    def text_to_speech(self, text: str, language_code: str = "hi", voice: str = "Shivani", speed: float = 1.0) -> bytes:
        """
        Sends text to Gnani Timbre v3 TTS and returns synthesized WAV audio bytes.
        """
        if not self.api_key:
            self.api_key = os.getenv("GNANI_API_KEY")

        payload = {
            "text": text,
            "voice": voice,
            "model": "timbre-v3.0",
            "language": language_code,
            "speed": speed,
            "audio_config": {
                "sample_rate": 24000,
                "num_channels": 1,
                "sample_width": 2,
                "encoding": "linear_pcm",
                "container": "wav"
            }
        }

        response = requests.post(
            TTS_URL,
            headers=self._get_headers("application/json"),
            json=payload,
            timeout=(5, 45)
        )
        response.raise_for_status()
        return response.content

# Singleton instance
gnani = GnaniClient()
