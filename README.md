# Bhasha — Real-Time Indian Language Speech Translation

Bhasha is an acoustic, real-time, bidirectional speech translation platform engineered for India's linguistic diversity. Built for *The Great Indian AI Challenge* with Gnani.ai.

## Architecture

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Sound FX synthesis.
- **Backend**: FastAPI, Uvicorn, Gnani AI Speech API, Groq LLM semantic parsing.

## Features

- **Live Conversation**: Face-to-face continuous bidirectional audio stream with cadence recognition.
- **Context Aware**: Contextual idiom and situational transit phrasing rather than dictionary swaps.
- **Hinglish & Code-Switching**: Handles vernacular speech mixed with English technical loanwords.
- **Natural Voice**: Neural speech synthesis with natural cadence.
- **India Travel / Street & Transit**: Real-time transit phrasing for auto stands, platforms, and bazaars.
- **Offline Emergency**: Pre-cached on-device critical clinic and SOS phrases.
- **Camera Translator**: Real-time visual script OCR.
- **Explain This**: Cultural idiom and colloquial breakdown.

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Fill in your API keys in .env

python run.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
