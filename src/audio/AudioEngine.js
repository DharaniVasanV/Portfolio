/**
 * AudioEngine.js — Procedural Web Audio API Synthesizer & Soundtrack Manager
 * 
 * Includes the Game of Thrones style epic orchestral soundtrack support.
 * Drop your mp3 file here: /public/assets/epic-theme.mp3
 */

let ctx = null;
let masterGain = null;
let musicGain = null;
let muted = false;
let bgDroneNodes = [];
let soundtrackAudioElement = null;
let soundtrackSource = null;

export function initAudioContext() {
  if (ctx) return ctx;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Master SFX Gain — kept very low for subtle ambient feel
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.12;
  masterGain.connect(ctx.destination);

  // Dedicated Music Gain
  musicGain = ctx.createGain();
  musicGain.gain.value = 0; // Starts silent
  musicGain.connect(ctx.destination);

  // Initialize Soundtrack Element
  soundtrackAudioElement = new Audio('/assets/epic-theme.mp3');
  soundtrackAudioElement.loop = true;
  soundtrackAudioElement.volume = 0.5; // Gain node handles actual muting well
  
  // Connect to Web Audio graph (may fail if CORS restricted in some setups, but OK for local absolute paths)
  try {
    soundtrackSource = ctx.createMediaElementSource(soundtrackAudioElement);
    soundtrackSource.connect(musicGain);
  } catch (e) {
    console.warn("MediaElementSource failed (often happens repeatedly in dev mode hot-reloads).", e);
  }

  return ctx;
}

export function setMuted(val) {
  muted = val;
  return toggleVolumeState();
}

export function toggleMute() {
  muted = !muted;
  return toggleVolumeState();
}

function toggleVolumeState() {
  if (!ctx) return muted;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(muted ? 0 : 0.12, ctx.currentTime, 0.1);
  }
  if (musicGain && soundtrackAudioElement) {
    musicGain.gain.setTargetAtTime(muted ? 0 : 0.4, ctx.currentTime, 0.1);
  }
  return muted;
}

export function isMuted() { return muted; }

function getCtx() {
  if (!ctx) initAudioContext();
  return ctx;
}

function connect(node) {
  node.connect(masterGain);
}

// --- EPIC SOUNDTRACK CONTROLS ---
export function playEpicTheme() {
  const c = getCtx();
  if (soundtrackAudioElement) {
    soundtrackAudioElement.play().catch(() => {});
    musicGain.gain.setValueAtTime(0, c.currentTime);
    musicGain.gain.linearRampToValueAtTime(0.15, c.currentTime + 2);
  }
}

export function swellEpicTheme() {
  const c = getCtx();
  if (musicGain && !muted) {
    musicGain.gain.cancelScheduledValues(c.currentTime);
    musicGain.gain.setTargetAtTime(0.4, c.currentTime, 1.5);
  }
}

// --- SFX (Power On, Whine, Shot, Shatter, Hiss) ---
export function playPowerOn() {
  const c = getCtx();
  const osc = c.createOscillator();
  const gainNode = c.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(30, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 3);
  gainNode.gain.setValueAtTime(0, c.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.06, c.currentTime + 0.5);
  gainNode.gain.linearRampToValueAtTime(0.03, c.currentTime + 3);
  osc.connect(gainNode);
  connect(gainNode);
  osc.start();
  osc.stop(c.currentTime + 3.5);

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const bufferSize = c.sampleRate * 0.05;
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) data[j] = (Math.random() * 2 - 1) * Math.random();
      const source = c.createBufferSource();
      source.buffer = buffer;
      const g = c.createGain();
      g.gain.value = 0.02 * Math.random();
      source.connect(g);
      connect(g);
      source.start();
    }, i * 200 + Math.random() * 150);
  }
}

export function playChargingWhine() {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2800, c.currentTime + 2.5);
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.08, c.currentTime + 3.0);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 3.5);
  osc.connect(g);
  connect(g);
  osc.start();
  osc.stop(c.currentTime + 3.6);
}

export function playGunshot() {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.3;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const g = c.createGain();
  g.gain.value = 0.12;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 400;
  filter.Q.value = 0.5;
  source.connect(filter);
  filter.connect(g);
  connect(g);
  source.start();
}

export function playImpactShatter() {
  const c = getCtx();
  for (let i = 0; i < 6; i++) {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800 + i * 340 + Math.random() * 200;
    g.gain.setValueAtTime(0.04, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
    osc.connect(g);
    connect(g);
    osc.start();
    osc.stop(c.currentTime + 0.9);
  }
  const bufferSize = c.sampleRate * 0.15;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  const source = c.createBufferSource();
  source.buffer = buffer;
  const g2 = c.createGain();
  g2.gain.value = 0.06;
  source.connect(g2);
  connect(g2);
  source.start();
}

export function playHydraulicHiss() {
  const c = getCtx();
  const bufferSize = c.sampleRate * 1.5;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 3000;
  const g = c.createGain();
  g.gain.value = 0.06;
  source.connect(filter);
  filter.connect(g);
  connect(g);
  source.start();
}

// --- UI SFX (Click, Shutter, Geiger, Uplink, Ping, Blip) ---
export function playDataClick() {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1200, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.06);
  g.gain.setValueAtTime(0.3, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
  osc.connect(g);
  connect(g);
  osc.start();
  osc.stop(c.currentTime + 0.1);
}

export function playCameraShutter() {
  const c = getCtx();
  const bufferSize = c.sampleRate * 0.1;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (i < bufferSize * 0.1 ? 1 : (1 - i / bufferSize));
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'peaking';
  filter.frequency.value = 2000;
  filter.gain.value = 10;
  const g = c.createGain();
  g.gain.value = 0.6;
  source.connect(filter);
  filter.connect(g);
  connect(g);
  source.start();
}

export function playGeigerTick() {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = 600 + Math.random() * 200;
  g.gain.setValueAtTime(0.15, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.03);
  osc.connect(g);
  connect(g);
  osc.start();
  osc.stop(c.currentTime + 0.05);
}

export function playUplink() {
  const c = getCtx();
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'square';
      osc.frequency.value = 440 + i * 220;
      g.gain.setValueAtTime(0.2, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
      osc.connect(g);
      connect(g);
      osc.start();
      osc.stop(c.currentTime + 0.2);
    }, i * 120);
  }
}

export function playSuccessPing() {
  const c = getCtx();
  const freqs = [523, 659, 784, 1047];
  freqs.forEach((freq, i) => {
    setTimeout(() => {
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.3, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
      osc.connect(g);
      connect(g);
      osc.start();
      osc.stop(c.currentTime + 0.6);
    }, i * 80);
  });
}

export function playSkillBlip() {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'sine';
  osc.frequency.value = 1800 + Math.random() * 600;
  g.gain.setValueAtTime(0.08, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
  osc.connect(g);
  connect(g);
  osc.start();
  osc.stop(c.currentTime + 0.05);
}

export function startAmbientDrone() {
  const c = getCtx();
  stopAmbientDrone();
  const freqs = [55, 82.5, 110];
  bgDroneNodes = freqs.map(freq => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.value = 0.04;
    osc.connect(g);
    connect(g);
    osc.start();
    return { osc, g };
  });
}

export function stopAmbientDrone() {
  bgDroneNodes.forEach(({ osc }) => { try { osc.stop(); } catch(e) {} });
  bgDroneNodes = [];
}