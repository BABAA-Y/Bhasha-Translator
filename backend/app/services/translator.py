from app.core.config import settings

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

def translate(text: str, source_lang: str, target_lang: str) -> str:
    """
    Translates text between Indian languages.
    Uses Groq LLM if GROQ_API_KEY is available, with conversational fallback.
    """
    if not text or not text.strip():
        return ""

    if source_lang == target_lang:
        return text.strip()

    if settings.GROQ_API_KEY:
        try:
            from groq import Groq
            client = Groq(api_key=settings.GROQ_API_KEY)
            src_name = LANG_NAMES.get(source_lang, source_lang)
            tgt_name = LANG_NAMES.get(target_lang, target_lang)

            prompt = f"Translate the following spoken {src_name} sentence into natural conversational {tgt_name}:\n\n\"{text.strip()}\""

            models_to_try = [
                "qwen/qwen3.8-27b",
                "openai/gpt-oss-120b",
                "openai/gpt-oss-20b",
                "llama-3.1-8b-instant"
            ]
            last_err = None
            for model_name in models_to_try:
                try:
                    completion = client.chat.completions.create(
                        model=model_name,
                        messages=[
                            {"role": "system", "content": SYSTEM_PROMPT},
                            {"role": "user", "content": prompt}
                        ],
                        temperature=0.2,
                        max_tokens=256,
                    )
                    result = completion.choices[0].message.content.strip()
                    if result.startswith('"') and result.endswith('"'):
                        result = result[1:-1].strip()
                    return result
                except Exception as model_err:
                    last_err = model_err
                    continue

            if last_err:
                print(f"[WARNING] Groq translation error across models: {last_err}. Falling back.")
        except Exception as e:
            print(f"[WARNING] Groq translation error: {e}. Falling back.")

    # Dictionary fallback for common Indian daily expressions
    common_phrases = {
        ("hi", "ta"): {
            "नमस्ते": "வணக்கம்",
            "भैया मीटर से चलोगे?": "அண்ணா, மீட்டருக்கு வருவீங்களா?",
            "रेलवे स्टेशन चलोगे?": "ரயில் நிலையத்திற்கு போவீங்களா?",
            "कितना रुपया हुआ?": "எவ்வளவு ஆச்சு?",
            "ऑनलाइन पेमेंट चलेगा?": "ஆன்லைன் பேமெண்ட் எடுப்பீங்களா?",
            "दवाई की दुकान कहाँ है?": "மருந்து கடை எங்கே இருக்கிறது?",
        },
        ("ta", "hi"): {
            "வணக்கம்": "नमस्ते",
            "நூறு ரூபாய்": "सौ रुपये",
            "மீட்டருக்கு போறேன்": "मीटर से चलूंगा",
            "வாங்க": "आइए",
        }
    }

    match = common_phrases.get((source_lang, target_lang), {}).get(text.strip())
    if match:
        return match

    return f"[{LANG_NAMES.get(target_lang, target_lang)}: {text}]"
