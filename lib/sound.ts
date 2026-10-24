'use client';

// Restrained, optional Web Audio tactile click synthesizer.
// Strictly OFF by default. Never plays unless explicitly enabled by user action.

class TactileAudioController {
  private enabled = false;
  private ctx: AudioContext | null = null;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): boolean {
    this.enabled = next;
    if (next) {
      this.playSubtleTick(660);
    }
    return this.enabled;
  }

  public playSubtleTick(frequency = 520): void {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.028);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Ignore audio errors on restricted environments
    }
  }
}

export const soundController = new TactileAudioController();
