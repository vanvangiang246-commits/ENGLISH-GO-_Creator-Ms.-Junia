/**
 * ENGLISH GO! - Sound & Speech Utility
 * Author: Ms. Junia
 *
 * Uses native Web Speech API & Web Audio API synthesizers.
 * Zero external audio dependencies = 100% offline & fast.
 */

/**
 * ENGLISH GO! - Sound & Speech Utility
 * Author: Ms. Junia
 *
 * Provides natural native-like English TTS for young learners (Global Success 1-5).
 * Guarantees proper English phonetics, word stress, intonation, and contractions.
 */

// Cached English voices to ensure instant native pronunciation
let cachedEnglishVoices: SpeechSynthesisVoice[] = [];

const refreshVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const all = window.speechSynthesis.getVoices();
  if (all && all.length > 0) {
    cachedEnglishVoices = all.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  }
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    refreshVoices();
  };
}

/**
 * Selects the best native English voice for young learners.
 * Strictly filters out any non-English system voices (e.g. Vietnamese system defaults).
 */
export const getBestEnglishVoice = (): SpeechSynthesisVoice | null => {
  refreshVoices();
  if (cachedEnglishVoices.length === 0) return null;

  // Priority order for natural, clear, warm native English voices suitable for primary school
  const preferredNamePatterns = [
    /Ana.*Online.*Natural/i,     // Microsoft Ana (friendly child voice)
    /Jenny.*Online.*Natural/i,   // Microsoft Jenny (warm, clear native US)
    /Aria.*Online.*Natural/i,    // Microsoft Aria (natural US)
    /Google US English/i,        // Google US English (standard native Android/Chrome)
    /Samantha/i,                 // Apple Samantha (standard clear native US)
    /Google UK English Female/i, // Google UK Female
    /Victoria/i,                 // Apple Victoria
    /Karen/i,                    // Apple Karen
    /Daniel/i,                   // Apple Daniel
    /Natural/i,                  // Any other natural neural English voice
  ];

  for (const pattern of preferredNamePatterns) {
    const match = cachedEnglishVoices.find((v) => pattern.test(v.name));
    if (match) return match;
  }

  // Priority for en-US standard native voices
  const enUS = cachedEnglishVoices.find((v) => v.lang.toLowerCase() === 'en-us');
  if (enUS) return enUS;

  // Fallback to any en-GB voice
  const enGB = cachedEnglishVoices.find((v) => v.lang.toLowerCase().startsWith('en-gb'));
  if (enGB) return enGB;

  // Fallback to first available English voice
  return cachedEnglishVoices[0] || null;
};

// Speech Synthesis for Questions and Vocabulary
export const speakEnglish = (
  text: string,
  rate = 0.82,
  onEnd?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return false;
  }

  // Normalize contractions and punctuation so TTS speaks naturally like "I'm" (/aɪm/)
  // instead of robotic spelling or treating apostrophes as separate characters.
  const cleanText = text
    .replace(/[\u2018\u2019]/g, "'") // Normalize curly apostrophes (e.g. I’m -> I'm)
    .replace(/[\u201C\u201D]/g, '"')
    .trim();

  const doSpeak = () => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Force en-US locale
      utterance.lang = 'en-US';

      // Pick the best native English voice
      const bestVoice = getBestEnglishVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang;
      }

      // Warm, child-friendly pitch and steady, clear primary school pace
      utterance.rate = rate; // ~0.82: natural, comfortable pace with full sentence stress
      utterance.pitch = 1.05; // Slightly higher, warm and welcoming tone for children

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      if (onEnd) onEnd();
      return false;
    }
  };

  // If voices have not loaded yet (common on first click in Chromium), wait for voiceschanged
  const currentVoices = window.speechSynthesis.getVoices();
  if (!currentVoices || currentVoices.length === 0) {
    let fired = false;
    const onVoicesLoaded = () => {
      if (!fired) {
        fired = true;
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesLoaded);
        refreshVoices();
        doSpeak();
      }
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesLoaded);
    // Safe timeout fallback
    setTimeout(() => {
      if (!fired) {
        fired = true;
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesLoaded);
        doSpeak();
      }
    }, 250);
    return true;
  }

  return doSpeak();
};

// Cheerful sound synthesis using Web Audio API
class AudioSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Cheerful chime for correct answer
  playCorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Major chord arpeggio: C5 -> E5 -> G5 -> C6
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.5, now + 0.24);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Gentle soft boop for encouraging try-again
  playEncouraging() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(392.0, now); // G4
      osc.frequency.setValueAtTime(329.63, now + 0.12); // E4

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Fallback
    }
  }

  // Victory fanfare on completion
  playVictory() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
      const times = [0, 0.1, 0.2, 0.3, 0.45, 0.6];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + times[idx];

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        osc.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0.22, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {
      // Fallback
    }
  }
}

export const soundEffects = new AudioSynthesizer();
