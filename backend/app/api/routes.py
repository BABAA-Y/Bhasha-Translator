import base64
import json
import asyncio
import websockets
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

from app.core.config import settings
from app.core.database import get_database
from app.services.audio_converter import convert_audio_to_wav
from app.services.gnani_stt import transcribe_speech, PRISMA_STREAM_URL, get_prisma_stream_headers
from app.services.gnani_tts import synthesize_speech
from app.services.translator import translate, LANG_NAMES

router = APIRouter(prefix="/api")

class TextTranslateRequest(BaseModel):
    text: str
    source_lang: str = "hi"
    target_lang: str = "ta"

@router.websocket("/ws/stt-stream")
async def websocket_stt_stream(websocket: WebSocket, source_lang: str = "hi"):
    """
    Real-time streaming Speech-to-Text WebSocket gateway:
    Receives live 16kHz PCM audio chunks from browser, bridges them to
    Gnani Prisma Streaming STT, and emits progressive partial/final transcripts.
    """
    await websocket.accept()
    headers = get_prisma_stream_headers(source_lang)
    
    latest_transcript = ""
    is_client_stopped = False
    has_sent_final = False

    try:
        async with websockets.connect(PRISMA_STREAM_URL, additional_headers=headers) as gnani_ws:
            # 1. Await initial connection confirmation from Gnani Prisma
            try:
                init_msg = await asyncio.wait_for(gnani_ws.recv(), timeout=8.0)
                await websocket.send_json({
                    "type": "connected",
                    "status": "ready",
                    "language_code": headers.get("language_code"),
                    "message": "Live STT streaming initialized"
                })
            except Exception as conn_err:
                print(f"[ERROR] Gnani streaming connection failed: {conn_err}")
                await websocket.send_json({"type": "error", "message": f"Gnani connection error: {conn_err}"})
                await websocket.close()
                return

            # Task A: Forward raw PCM audio chunks from browser to Gnani
            async def forward_audio_to_gnani():
                nonlocal latest_transcript, is_client_stopped
                try:
                    while True:
                        msg = await websocket.receive()
                        if "bytes" in msg and msg["bytes"]:
                            # Stream binary 16kHz PCM audio
                            await gnani_ws.send(msg["bytes"])
                        elif "text" in msg and msg["text"]:
                            try:
                                data = json.loads(msg["text"])
                                if data.get("action") == "stop":
                                    is_client_stopped = True
                                    # Send brief silence buffer to trigger Gnani VAD finalize
                                    silence = b"\x00" * 1024
                                    for _ in range(12):
                                        await gnani_ws.send(silence)
                                        await asyncio.sleep(0.015)
                                    break
                            except Exception:
                                pass
                except (WebSocketDisconnect, asyncio.CancelledError):
                    pass
                except Exception as e:
                    print(f"[WARNING] Client audio stream error: {e}")

            # Task B: Receive partial and final transcripts from Gnani and forward to browser
            async def forward_events_to_browser():
                nonlocal latest_transcript, is_client_stopped, has_sent_final
                try:
                    async for gnani_msg in gnani_ws:
                        try:
                            parsed = json.loads(gnani_msg)
                            msg_type = parsed.get("type")

                            if msg_type in ("partial_transcript", "transcript"):
                                text = (parsed.get("text") or "").strip()
                                is_fin = parsed.get("is_final", False)
                                if text:
                                    latest_transcript = text
                                if is_fin:
                                    has_sent_final = True
                                await websocket.send_json({
                                    "type": "final_transcript" if is_fin else "partial_transcript",
                                    "text": text or latest_transcript,
                                    "is_final": is_fin,
                                    "stable_text": parsed.get("stable_text", ""),
                                    "volatile_text": parsed.get("volatile_text", ""),
                                })
                                if is_fin and is_client_stopped:
                                    break

                            elif msg_type == "final_transcript":
                                text = (parsed.get("text") or "").strip() or latest_transcript
                                latest_transcript = text
                                has_sent_final = True
                                await websocket.send_json({
                                    "type": "final_transcript",
                                    "text": text,
                                    "is_final": True
                                })
                                if is_client_stopped:
                                    break

                            elif msg_type == "speech_start":
                                await websocket.send_json({
                                    "type": "speech_start",
                                    "utterance_id": parsed.get("utterance_id")
                                })

                        except Exception as parse_err:
                            print(f"[WARNING] Gnani event parse error: {parse_err}")

                except (WebSocketDisconnect, asyncio.CancelledError):
                    pass
                except Exception as e:
                    print(f"[WARNING] Gnani receive error: {e}")

            # Run concurrently
            sender_task = asyncio.create_task(forward_audio_to_gnani())
            receiver_task = asyncio.create_task(forward_events_to_browser())

            done, pending = await asyncio.wait(
                [sender_task, receiver_task],
                return_when=asyncio.FIRST_COMPLETED,
            )

            # Wait briefly for remaining final event if stopped cleanly
            if is_client_stopped and not receiver_task.done():
                try:
                    await asyncio.wait_for(receiver_task, timeout=1.5)
                except (asyncio.TimeoutError, Exception):
                    pass

            for task in pending:
                task.cancel()

            if pending:
                await asyncio.gather(*pending, return_exceptions=True)

            # Ensure final transcript is guaranteed sent before closing if not already sent
            if latest_transcript and not has_sent_final:
                try:
                    await websocket.send_json({
                        "type": "final_transcript",
                        "text": latest_transcript,
                        "is_final": True
                    })
                except Exception:
                    pass

    except (WebSocketDisconnect, Exception) as ws_err:
        print(f"[INFO] Streaming STT session ended: {ws_err}")
    finally:
        try:
            await websocket.close()
        except Exception:
            pass

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
        if not raw_audio or len(raw_audio) < 80:
            return {
                "transcript": "",
                "translated_text": "",
                "audio_base64": None,
                "message": "Audio buffer too short or empty"
            }

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
        clean_text = (req.text or "").strip()
        if not clean_text:
            return {
                "original_text": "",
                "translated_text": "",
                "audio_base64": None,
                "source_lang": req.source_lang,
                "target_lang": req.target_lang
            }

        translated_text = translate(
            text=clean_text,
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

class TTSRequest(BaseModel):
    text: str
    language_code: str = "auto"
    voice: str = "Shivani"
    speed: float = 1.0

def detect_script_language(text: str) -> str:
    """Detects primary Indian language code from Unicode script range."""
    for ch in text:
        cp = ord(ch)
        if 0x0B80 <= cp <= 0x0BFF:
            return "ta"
        if 0x0900 <= cp <= 0x097F:
            return "hi"
        if 0x0C00 <= cp <= 0x0C7F:
            return "te"
        if 0x0C80 <= cp <= 0x0CFF:
            return "kn"
        if 0x0980 <= cp <= 0x09FF:
            return "bn"
        if 0x0D00 <= cp <= 0x0D7F:
            return "ml"
        if 0x0A80 <= cp <= 0x0AFF:
            return "gu"
        if 0x0A00 <= cp <= 0x0A7F:
            return "pa"
    return "hi"

@router.post("/tts")
async def tts_endpoint(req: TTSRequest):
    """
    Direct Gnani Timbre TTS synthesis endpoint for natural conversational voice.
    """
    clean_text = (req.text or "").strip()
    if not clean_text:
        return {"audio_base64": None, "text": "", "language_code": req.language_code}

    lang = req.language_code
    if not lang or lang == "auto":
        lang = detect_script_language(clean_text)

    try:
        tts_audio = synthesize_speech(
            text=clean_text,
            language_code=lang,
            voice=req.voice or "Shivani",
            speed=req.speed or 1.0,
        )
        audio_base64 = None
        if tts_audio:
            audio_base64 = f"data:audio/wav;base64,{base64.b64encode(tts_audio).decode('utf-8')}"
        return {
            "text": clean_text,
            "language_code": lang,
            "voice": req.voice,
            "audio_base64": audio_base64,
        }
    except Exception as e:
        print(f"[ERROR] Direct TTS endpoint failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
