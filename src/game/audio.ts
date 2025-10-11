const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

function beep(freq = 440, duration = 0.12, type: OscillatorType = 'sine') {
  const now = ctx.currentTime
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.value = freq
  o.connect(g)
  g.connect(ctx.destination)
  g.gain.setValueAtTime(0.0001, now)
  g.gain.exponentialRampToValueAtTime(0.2, now + 0.01)
  o.start(now)
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  o.stop(now + duration + 0.02)
}

export function playClick() {
  beep(900, 0.06, 'sine')
}
export function playSpawn() {
  beep(650, 0.08, 'triangle')
}
export function playWin() {
  beep(1100, 0.18, 'sawtooth')
}
