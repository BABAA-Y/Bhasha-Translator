// Web Audio API Sound Generator for Interactive Bhasha Demos

class SoundEffectsManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
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

  // Play warm, natural Bhasha Indic audio
  playNaturalBhashaSound(text = "அண்ணா, மீட்டருக்கு வருவீங்களா?") {
    this.init();

    // 1. Play pleasant melodic acoustic chime
    if (this.ctx) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.2); // E5

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    }

    // 2. Play natural speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.05; // Human warmth
      utterance.rate = 0.95;  // Natural conversational cadence
      utterance.volume = 1.0;

      // Try selecting Indian voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang.includes("ta") || v.lang.includes("hi") || v.lang.includes("IN"));
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

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
