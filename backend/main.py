import sys
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from audio_utils import convert_audio_to_wav
from gnani_client import gnani
from translator import translate_text, LANG_NAMES

app = FastAPI(title="Bhasha (भाषा) AI Voice Translation API", version="1.0.0")

# Enable CORS for local Vite dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextTranslateRequest(BaseModel):
    text: str
    source_lang: str = "hi"
    target_lang: str = "ta"

@app.get("/api/health")
def health_check():
    has_gnani = bool(gnani.api_key)
    return {
        "status": "online",
        "app": "Bhasha (भाषा)",
        "gnani_configured": has_gnani,
        "supported_languages": LANG_NAMES
    }

@app.get("/api/quick-cards")
def get_quick_cards():
    """Returns top daily Bharat situation cards for 1-tap instant speech"""
    return [
        {
            "id": "auto_meter",
            "category": "🛺 Auto / Travel",
            "phrases": [
                {"hi": "भैया मीटर से चलोगे?", "label": "Meter se chaloge?"},
                {"hi": "स्टेशन तक का कितना लोगे?", "label": "Station ka kitna?"},
                {"hi": "यहाँ रोक दीजिए", "label": "Yahan rok dijiye"}
            ]
        },
        {
            "id": "payment",
            "category": "💳 Payment / UPI",
            "phrases": [
                {"hi": "ऑनलाइन पेमेंट / क्यूआर कोड चलेगा?", "label": "Online payment chalega?"},
                {"hi": "कुल कितना रुपया हुआ?", "label": "Kitna rupaya hua?"},
                {"hi": "कैश नहीं है मेरे पास", "label": "Cash nahi hai"}
            ]
        },
        {
            "id": "medical",
            "category": "🏥 Medical / Emergency",
            "phrases": [
                {"hi": "यहाँ पास में अस्पताल कहाँ है?", "label": "Hospital kahan hai?"},
                {"hi": "यह दवाई कब और कैसे खानी है?", "label": "Dawai kab khani hai?"},
                {"hi": "मुझे मदद चाहिए", "label": "Mujhe madad chahiye"}
            ]
        },
        {
            "id": "directions",
            "category": "📍 Directions",
            "phrases": [
                {"hi": "मेट्रो स्टेशन किस तरफ है?", "label": "Metro kis taraf hai?"},
                {"hi": "सीधे जाना है या मुड़ना है?", "label": "Seedhe ya turn?"}
            ]
        }
    ]

@app.post("/api/translate-voice")
async def translate_voice(
    audio: UploadFile = File(...),
    source_lang: str = Form("hi"),
    target_lang: str = Form("ta")
):
    """
    Receives voice recording from browser, transcribes via Gnani Prisma,
    translates to target language, synthesizes speech via Gnani Timbre,
    and returns both texts and base64 audio.
    """
    try:
        raw_audio = await audio.read()
        if not raw_audio:
            raise HTTPException(status_code=400, detail="Empty audio payload received")

        # 1. Convert browser audio to 16kHz mono WAV
        wav_audio = convert_audio_to_wav(raw_audio)

        # 2. Transcribe using Gnani Prisma STT
        transcript = gnani.speech_to_text(
            wav_bytes=wav_audio,
            filename="user_speech.wav",
            language_code=source_lang
        )

        if not transcript:
            return {
                "transcript": "",
                "translated_text": "",
                "audio_base64": None,
                "message": "No speech detected. Please speak clearly into the microphone."
            }

        # 3. Translate conversational text
        translated_text = translate_text(
            text=transcript,
            source_lang=source_lang,
            target_lang=target_lang
        )

        # 4. Synthesize speech using Gnani Timbre v3 TTS
        audio_base64 = None
        try:
            tts_audio = gnani.text_to_speech(
                text=translated_text,
                language_code=target_lang,
                voice="Shivani"
            )
            audio_base64 = f"data:audio/wav;base64,{base64.b64encode(tts_audio).decode('utf-8')}"
        except Exception as tts_err:
            print(f"[WARNING] TTS synthesis warning: {tts_err}")

        return {
            "transcript": transcript,
            "translated_text": translated_text,
            "audio_base64": audio_base64,
            "source_lang": source_lang,
            "target_lang": target_lang
        }

    except Exception as e:
        print(f"[ERROR] Error in translate_voice: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/translate-text")
async def translate_text_endpoint(req: TextTranslateRequest):
    """
    Translates text directly and returns speech audio. Useful for Quick Desi Cards.
    """
    try:
        translated_text = translate_text(
            text=req.text,
            source_lang=req.source_lang,
            target_lang=req.target_lang
        )

        audio_base64 = None
        try:
            tts_audio = gnani.text_to_speech(
                text=translated_text,
                language_code=req.target_lang,
                voice="Shivani"
            )
            audio_base64 = f"data:audio/wav;base64,{base64.b64encode(tts_audio).decode('utf-8')}"
        except Exception as tts_err:
            print(f"[WARNING] TTS synthesis warning: {tts_err}")

        return {
            "original_text": req.text,
            "translated_text": translated_text,
            "audio_base64": audio_base64,
            "source_lang": req.source_lang,
            "target_lang": req.target_lang
        }

    except Exception as e:
        print(f"[ERROR] Error in translate_text_endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
