/**
 * Sound Effects for Birthday Site
 * 
 * Add these audio files to /public/sounds/:
 * - confetti.mp3 (party popper sound)
 * - drawer.mp3 (wooden drawer sliding)
 * - shake.mp3 (jar shaking/rattling)
 * - pop.mp3 (bubble pop for notes)
 * - success.mp3 (chime for completing things)
 * 
 * You can find free sounds at:
 * - freesound.org
 * - mixkit.co/free-sound-effects
 * - pixabay.com/sound-effects
 */

class SoundEffects {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    if (typeof window !== "undefined") {
      this.preload();
    }
  }

  private preload() {
    const soundFiles = [
      "confetti",
      "drawer", 
      "shake",
      "pop",
      "success",
    ];

    soundFiles.forEach((name) => {
      const audio = new Audio(`/sounds/${name}.mp3`);
      audio.preload = "auto";
      audio.volume = this.volume;
      this.sounds.set(name, audio);
    });
  }

  play(name: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      // Clone so we can play multiple times rapidly
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = this.volume;
      clone.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume = this.volume;
    });
  }

  isEnabled() {
    return this.enabled;
  }
}

// Singleton instance
export const sfx = typeof window !== "undefined" ? new SoundEffects() : null;

// Convenience functions
export const playSound = (name: "confetti" | "drawer" | "shake" | "pop" | "success") => {
  sfx?.play(name);
};

export const setSoundEnabled = (enabled: boolean) => {
  sfx?.setEnabled(enabled);
};

export const setSoundVolume = (volume: number) => {
  sfx?.setVolume(volume);
};
