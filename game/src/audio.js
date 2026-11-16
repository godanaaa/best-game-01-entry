export function createAudio() {
  let context = null;
  const audio = { muted: false };
  function tone(freq, duration, type = 'sine', gain = 0.035, endFreq = freq) {
    try {
      if (audio.muted) return;
      context ||= new (window.AudioContext || window.webkitAudioContext)();
      if (context.state === 'suspended') context.resume();
      const osc = context.createOscillator(), amp = context.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(25, endFreq), context.currentTime + duration);
      amp.gain.setValueAtTime(gain, context.currentTime); amp.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
      osc.connect(amp).connect(context.destination); osc.start(); osc.stop(context.currentTime + duration);
    } catch { /* Audio is optional. */ }
  }
  audio.unlock = () => { try { context ||= new (window.AudioContext || window.webkitAudioContext)(); if (context.state === 'suspended') context.resume(); } catch {} };
  audio.shoot = () => tone(280, .07, 'triangle', .018, 180);
  audio.hit = () => tone(105, .1, 'triangle', .035, 58);
  audio.pickup = combo => tone(540 + Math.min(combo, 12) * 28, .18, 'sine', .04, 900 + Math.min(combo, 12) * 35);
  audio.levelup = () => [440, 554, 659, 880].forEach((n, i) => setTimeout(() => tone(n, .22, 'sine', .04, n * 1.25), i * 85));
  audio.hurt = () => tone(130, .24, 'sawtooth', .04, 52);
  audio.gameover = () => [440, 330, 220].forEach((n, i) => setTimeout(() => tone(n, .34, 'triangle', .04, n * .72), i * 150));
  audio.click = () => tone(660, .06, 'sine', .025, 820);
  return audio;
}
