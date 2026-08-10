/**
 * Web Audio API Celestial Sound Synthesizer
 * Menghasilkan suara ambient langit malam yang menenangkan tanpa butuh file audio eksternal.
 * + Background Music Player dengan fade-in smooth
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.timer = null;

    // Background Music (BGM)
    this.bgm = null;
    this.bgmGain = null;
    this.bgmLoaded = false;
    this.bgmPath = 'music/bgm.mp3';
    this.bgmTargetVolume = 0.5;  // Target volume setelah fade-in
    this.bgmFadeDuration = 3500; // Fade-in 3.5 detik
  }

  init() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.audioCtx = new AudioContext();
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);
  }

  // =============================================
  // Background Music Player (#bgmAudio DOM element)
  // =============================================
  getBGM() {
    return document.getElementById('bgmAudio');
  }

  playBGM() {
    const bgm = this.getBGM();
    if (!bgm) return;

    bgm.volume = 0.15; // Audible right away
    const promise = bgm.play();
    if (promise !== undefined) {
      promise.then(() => {
        this.fadeInBGM();
      }).catch(err => {
        console.warn('BGM play blocked or error:', err);
      });
    }
  }

  fadeInBGM() {
    const bgm = this.getBGM();
    if (!bgm) return;
    const startTime = performance.now();
    const startVol = bgm.volume;
    const target = this.bgmTargetVolume;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / this.bgmFadeDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      bgm.volume = Math.min(startVol + eased * (target - startVol), 1);

      if (progress < 1 && !bgm.paused) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }

  pauseBGMWithFade() {
    const bgm = this.getBGM();
    if (!bgm || bgm.paused) return;
    const startVolume = bgm.volume;
    const startTime = performance.now();
    const fadeDuration = 1200;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / fadeDuration, 1);
      bgm.volume = startVolume * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        bgm.pause();
      }
    };
    requestAnimationFrame(tick);
  }

  toggle() {
    const bgm = this.getBGM();
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (!bgm) return false;

    if (bgm.paused) {
      this.playBGM();
      this.start();
      return true;
    } else {
      this.pauseBGMWithFade();
      this.stop();
      return false;
    }
  }

  start() {
    if (!this.audioCtx) return;
    this.isPlaying = true;

    // Cosmic pentatonic frequencies (Hz): D3, F#3, A3, C#4, E4, F#4, A4
    const notes = [146.83, 185.00, 220.00, 277.18, 329.63, 369.99, 440.00, 554.37];

    // Background pad synth
    notes.slice(0, 4).forEach((freq) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Low pass filter for soft warm sound
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscillators.push({ osc, gain });
    });

    // Random soft chime sparkle every few seconds
    const playChime = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const randomNote = notes[Math.floor(Math.random() * notes.length)] * 2;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.02, this.audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 2.6);

      this.timer = setTimeout(playChime, 2500 + Math.random() * 3500);
    };

    playChime();
  }

  playStarClickSound() {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;
    
    // Magical sparkle bell on star click
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain || this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);

    this.oscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
        setTimeout(() => osc.stop(), 500);
      } catch (e) {}
    });
    this.oscillators = [];
  }
}

const soundEngine = new SoundEngine();

