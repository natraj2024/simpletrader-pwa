
class AudioService {
  private enabled: boolean = false;
  private synthesis: SpeechSynthesis;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      this.speak("Audio feedback enabled.");
    }
  }

  speak(text: string) {
    if (!this.enabled || !this.synthesis) return;
    
    // Cancel any ongoing speech to prioritize the newest message
    this.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1; // Slightly faster for power users
    utterance.pitch = 1.0;
    this.synthesis.speak(utterance);
  }
}

export const audioService = new AudioService();
