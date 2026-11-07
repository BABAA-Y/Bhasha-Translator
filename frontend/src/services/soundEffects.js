// Web Audio API Sound Generator & Gnani.ai Voice Player for Interactive Bhasha Demos
import { synthesizeSpeech } from "./api";

// High-fidelity pre-rendered Gnani Timbre AI voice tracks for instant playback
const PRE_RENDERED_GNANI_VOICES = {
  "ஒரு ஸ்ட்ராங் டீயும் தண்ணீரும் கொடுங்கள்.": "/audio/natural_voice_tamil.wav",
  "அண்ணா, மீட்டருக்கு வருவீங்களா?": "/audio/auto_meter_tamil.wav",
  "அண்ணா, இங்கே நிறுத்துங்கள்.": "/audio/stop_here_tamil.wav",
  "भैया, यहाँ रोक देना।": "/audio/stop_here_hindi.wav",
  "शुद्ध शाकाहारी भोजन उपलब्ध है": "/audio/veg_food_hindi.wav",
};

class SoundEffectsManager {
  constructor() {
    this.ctx = null;
    this.audioPlayer = null;
    this.audioCache = new Map();
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play an audio source (URL or base64 data URI) cleanly
  playAudioElement(src) {
    if (typeof window === "undefined") return;
    try {
      if (!this.audioPlayer) {
        this.audioPlayer = new Audio();
      }
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
      this.audioPlayer.src = src;
      const playPromise = this.audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn("Audio autoplay blocked by browser policy:", e);
        });
      }
    } catch (err) {
      console.warn("Audio player error:", err);
    }
  }

  // Play mechanical, robotic literal audio
  playLiteralRobotSound(text = "Brother, will you walk by the instrument?") {
    this.init();

    // 1. Play robotic mechanical buzz sequence via Oscillator
    if (this.ctx) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.setValueAtTime(95, this.ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(80, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    }

    // 2. Play robotic speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.4; // Flat, metallic robotic pitch
      utterance.rate = 0.85;  // Slow, mechanical rate
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Play warm, natural Gnani.ai Indic voice (Conversational cadence and breath)
  async playNaturalBhashaSound(
    text = "ஒரு ஸ்ட்ராங் டீயும் தண்ணீரும் கொடுங்கள்.",
    lang = "auto",
    voice = "Shivani"
  ) {
    const cleanText = (text || "").trim();
    if (!cleanText) return;

    // 1. Check if we have pre-rendered high quality Gnani audio file
    if (PRE_RENDERED_GNANI_VOICES[cleanText]) {
      this.playAudioElement(PRE_RENDERED_GNANI_VOICES[cleanText]);
      return;
    }

    // 2. Check in-memory synthesis cache
    if (this.audioCache.has(cleanText)) {
      this.playAudioElement(this.audioCache.get(cleanText));
      return;
    }

    // 3. Request real Gnani Timbre TTS from backend
    try {
      const result = await synthesizeSpeech(cleanText, lang, voice);
      if (result && result.audio_base64) {
        this.audioCache.set(cleanText, result.audio_base64);
        this.playAudioElement(result.audio_base64);
        return;
      }
    } catch (err) {
      console.warn("Gnani TTS API notice, falling back to speech synthesis:", err);
    }

    // 4. Graceful offline/error fallback only if backend unreachable
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) => v.lang.includes("ta") || v.lang.includes("hi") || v.lang.includes("IN")
      );
      if (indianVoice) utterance.voice = indianVoice;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Play short interactive pulse click / ripple tone
  playRipplePulse() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
}

export const soundFx = new SoundEffectsManager();
