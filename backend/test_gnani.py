import sys
from app.core.config import settings
from app.services.gnani_tts import synthesize_speech

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def test_tts():
    if not settings.GNANI_API_KEY:
        print("[ERROR] GNANI_API_KEY is not set in backend/.env file!")
        print("Please add your key to backend/.env and try again.")
        return False

    masked_key = settings.GNANI_API_KEY[:6] + "..." + settings.GNANI_API_KEY[-4:]
    print(f"[INFO] Using API Key: {masked_key}")
    print("[INFO] Calling Gnani Timbre v3 TTS API...")

    try:
        audio_content = synthesize_speech(
            text="नमस्ते! मैं भाषा अनुवादक हूँ। आपका स्वागत है।",
            language_code="hi",
            voice="Shivani"
        )

        if audio_content:
            output_file = "test_output.wav"
            with open(output_file, "wb") as f:
                f.write(audio_content)
            print(f"[SUCCESS] Audio file saved to {output_file} ({len(audio_content)} bytes)")
            print("[INFO] Open and listen to test_output.wav to hear Gnani's voice!")
            return True
        else:
            print("[ERROR] Failed: Empty audio returned")
            return False

    except Exception as e:
        print(f"[ERROR] Test failed: {e}")
        return False

if __name__ == "__main__":
    test_tts()
