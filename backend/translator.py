import os
import sys
from dotenv import load_dotenv

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

LANG_NAMES = {
    "hi": "Hindi",
    "ta": "Tamil",
    "te": "Telugu",
    "kn": "Kannada",
    "bn": "Bengali",
    "mr": "Marathi",
    "gu": "Gujarati",
    "ml": "Malayalam",
    "pa": "Punjabi",
    "en": "Indian English"
}

SYSTEM_PROMPT = """You are Bhasha (भाषा), an expert real-time conversational translator for Indian languages.
Your goal is to translate spoken conversation naturally between two people in India.

RULES:
1. Translate accurately into natural, everyday colloquial Indian speech (street / conversational tone), NOT formal or textbook language.
   Example: "Bhaiya meter se chaloge?" -> In Tamil: "அண்ணா, மீட்டருக்கு வருவீங்களா?" (Anna, meter-ku varuveengala?)
2. Preserve politeness markers (Bhaiya, Didi, Anna, Chetta, Dada, Ji).
3. Strip meaningless fillers ("umm", "uhh", "matlab") if they don't add meaning.
4. Output ONLY the translated sentence. Do NOT add quotes, explanations, Romanized transliterations, or markdown formatting.
"""

def translate_text(text: str, source_lang: str, target_lang: str) -> str:
    """
    Translates text between Indian languages.
    Uses Groq LLM if GROQ_API_KEY is available, otherwise provides fallback.
    """
    if not text or not text.strip():
        return ""

    if source_lang == target_lang:
        return text

    groq_key = os.getenv("GROQ_API_KEY")
    if groq_key:
        try:
            from groq import Groq
            client = Groq(api_key=groq_key)
            src_name = LANG_NAMES.get(source_lang, source_lang)
            tgt_name = LANG_NAMES.get(target_lang, target_lang)

            prompt = f"Translate the following spoken {src_name} sentence into natural conversational {tgt_name}:\n\n\"{text.strip()}\""

            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,
                max_tokens=256,
            )
            result = completion.choices[0].message.content.strip()
            # Clean any accidental quotes
            if result.startswith('"') and result.endswith('"'):
                result = result[1:-1].strip()
            return result
        except Exception as e:
            print(f"[WARNING] Groq translation error: {e}. Falling back.")

    # Fallback simulation dictionary for key common phrases if no LLM key
    sample_translations = {
        ("hi", "ta"): {
            "नमस्ते": "வணக்கம்",
            "स्टेशन चलोगे?": "ஸ்டேஷனுக்கு போவீங்களா?",
            "कितना हुआ?": "எவ்வளவு ஆச்சு?",
            "मीटर से चलिए": "மீட்டர் போட்டு வாங்க",
            "दवाई कहाँ मिलेगी?": "மருந்து எங்கே கிடைக்கும்?",
        },
        ("ta", "hi"): {
            "வணக்கம்": "नमस्ते",
            "நூறு ரூபாய்": "सौ रुपये",
            "வாங்க": "आइए बैठिए",
        }
    }

    match = sample_translations.get((source_lang, target_lang), {}).get(text.strip())
    if match:
        return match

    # If no LLM key is present yet, return a clear indicator
    return f"[{LANG_NAMES.get(target_lang, target_lang)} translation of: {text}]"
