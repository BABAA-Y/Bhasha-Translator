import base64
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel

from app.core.config import settings
from app.services.audio_converter import convert_audio_to_wav
from app.services.gnani_stt import transcribe_speech
from app.services.gnani_tts import synthesize_speech
from app.services.translator import translate, LANG_NAMES

router = APIRouter(prefix="/api")

class TextTranslateRequest(BaseModel):
    text: str
    source_lang: str = "hi"
    target_lang: str = "ta"

@router.get("/health")
def health_check():
    return {
        "status": "online",
        "app": settings.PROJECT_NAME,
        "gnani_configured": bool(settings.GNANI_API_KEY),
        "supported_languages": LANG_NAMES
    }

@router.get("/quick-cards")
def get_quick_cards():
    return [
        {
            "id": "auto_travel",
            "category": "🛺 Auto & Travel",
            "phrases": [
                {"hi": "भैया मीटर से चलोगे?", "label": "Meter se chaloge?"},
                {"hi": "रेलवे स्टेशन चलोगे?", "label": "Railway station chaloge?"},
                {"hi": "यहाँ रोक दीजिए", "label": "Yahan rok dijiye"}
            ]
        },
        {
            "id": "payment_upi",
            "category": "💳 Payment & UPI",
            "phrases": [
                {"hi": "ऑनलाइन पेमेंट चलेगा?", "label": "Online payment chalega?"},
                {"hi": "कुल कितना रुपया हुआ?", "label": "Kitna rupaya hua?"},
                {"hi": "कैश नहीं है मेरे पास", "label": "Cash nahi hai"}
            ]
        },
        {
            "id": "emergency_medical",
            "category": "🏥 Medical & Emergency",
            "phrases": [
                {"hi": "दवाई की दुकान कहाँ है?", "label": "Medical shop kahan hai?"},
                {"hi": "यह दवाई कब खानी है?", "label": "Dawai kab khani hai?"},
                {"hi": "मुझे मदद चाहिए", "label": "Mujhe madad chahiye"}
            ]
        }
    ]

@router.post("/translate-voice")
async def translate_voice_endpoint(
    audio: UploadFile = File(...),
    source_lang: str = Form("hi"),
    target_lang: str = Form("ta")
):
    try:
        raw_audio = await audio.read()
        if not raw_audio:
            raise HTTPException(status_code=400, detail="Empty audio received")

        # 1. Convert to 16kHz mono WAV
        wav_audio = convert_audio_to_wav(raw_audio)

        # 2. Gnani Prisma STT
        transcript = transcribe_speech(
            wav_bytes=wav_audio,
            language_code=source_lang
        )

        if not transcript:
            return {
                "transcript": "",
                "translated_text": "",
                "audio_base64": None,
                "message": "No speech detected"
            }

        # 3. Colloquial Translation
        translated_text = translate(
            text=transcript,
            source_lang=source_lang,
            target_lang=target_lang
        )

        # 4. Gnani Timbre TTS
        audio_base64 = None
        try:
            tts_audio = synthesize_speech(
                text=translated_text,
                language_code=target_lang
            )
            if tts_audio:
                audio_base64 = f"data:audio/wav;base64,{base64.b64encode(tts_audio).decode('utf-8')}"
        except Exception as tts_err:
            print(f"[WARNING] TTS error: {tts_err}")

        return {
            "transcript": transcript,
            "translated_text": translated_text,
            "audio_base64": audio_base64,
            "source_lang": source_lang,
            "target_lang": target_lang
        }

    except Exception as e:
        print(f"[ERROR] Voice pipeline failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/translate-text")
async def translate_text_endpoint(req: TextTranslateRequest):
    try:
        translated_text = translate(
            text=req.text,
            source_lang=req.source_lang,
            target_lang=req.target_lang
        )

        audio_base64 = None
        try:
            tts_audio = synthesize_speech(
                text=translated_text,
                language_code=req.target_lang
            )
            if tts_audio:
                audio_base64 = f"data:audio/wav;base64,{base64.b64encode(tts_audio).decode('utf-8')}"
        except Exception as tts_err:
            print(f"[WARNING] TTS error: {tts_err}")

        return {
            "original_text": req.text,
            "translated_text": translated_text,
            "audio_base64": audio_base64,
            "source_lang": req.source_lang,
            "target_lang": req.target_lang
        }

    except Exception as e:
        print(f"[ERROR] Text translation endpoint failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
