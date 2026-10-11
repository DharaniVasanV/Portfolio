import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './IntroLoader.css';

/** An automatic, cinematic portfolio reveal. No click or sound permission required. */
export default function IntroLoader({ onComplete }) {
  const screenRef = useRef(null);
  const orbitRef = useRef(null);
  const coreRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const captionRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const progressBarRef = useRef(null);
  const flashRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return undefined;

    // Honour reduced-motion preferences without leaving the page scroll-locked.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timeout = window.setTimeout(() => {
        document.body.classList.remove('no-scroll');
        onComplete();
      }, 120);
      return () => window.clearTimeout(timeout);
    }

    const targets = [
      orbitRef.current,
      coreRef.current,
      kickerRef.current,
      titleRef.current,
      captionRef.current,
      topLineRef.current,
      bottomLineRef.current,
    ].filter(Boolean);

    gsap.set(screen, { autoAlpha: 1 });
    gsap.set(targets, { autoAlpha: 0, y: 24 });
    gsap.set(orbitRef.current, { scale: 0.68, rotation: -48 });
    gsap.set(coreRef.current, { scale: 0.35, rotation: -16 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(flashRef.current, { autoAlpha: 0 });

    const loadMeter = { value: 0 };
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .to(topLineRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.05)
      .to(bottomLineRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.1)
      .to(orbitRef.current, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 1.25, ease: 'expo.out' }, 0.08)
      .to(coreRef.current, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.7)' }, 0.34)
      .to(kickerRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.72)
      .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power4.out' }, 0.96)
      .to(captionRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 1.28)
      .to(progressBarRef.current, { scaleX: 1, duration: 2.75, ease: 'power2.inOut' }, 0.28)
      .to(loadMeter, {
        value: 100,
        duration: 2.75,
        ease: 'power2.inOut',
        onUpdate: () => setProgress(Math.round(loadMeter.value)),
      }, 0.28)
      .to(flashRef.current, { autoAlpha: 0.72, duration: 0.08, yoyo: true, repeat: 1, ease: 'none' }, 3.12)
      .to(screen, { autoAlpha: 0, scale: 1.035, duration: 0.72, ease: 'power2.inOut' }, 3.48)
      .call(() => {
        document.body.classList.remove('no-scroll');
        onComplete();
      });

    return () => timeline.kill();
  }, [onComplete]);

  return (
    <div className="intro-screen" ref={screenRef} role="status" aria-label="Portfolio loading">
      <div className="intro-ambient intro-ambient--left" aria-hidden="true" />
      <div className="intro-ambient intro-ambient--right" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-scanline" aria-hidden="true" />
      <div className="intro-topline" ref={topLineRef}>
        <span className="intro-brand"><span className="intro-brand-mark">DV</span> / PORTFOLIO</span>
        <span className="intro-edition">CREATIVE ENGINEERING <i /> 2026</span>
      </div>

      <div className="intro-center">
        <div className="intro-orbit intro-orbit--outer" ref={orbitRef} aria-hidden="true">
          <span className="intro-orbit-marker intro-orbit-marker--one" />
          <span className="intro-orbit-marker intro-orbit-marker--two" />
          <span className="intro-orbit-cross intro-orbit-cross--top" />
          <span className="intro-orbit-cross intro-orbit-cross--bottom" />
        </div>
        <div className="intro-orbit intro-orbit--inner" aria-hidden="true" />
        <div className="intro-core" ref={coreRef}>
          <span className="intro-core-scan" aria-hidden="true" />
          <span className="intro-monogram">DV</span>
          <span className="intro-core-caption">BUILD / BREAK / BUILD BETTER</span>
        </div>
        <p className="intro-kicker" ref={kickerRef}>DHARANI VASAN V <span>•</span> DEVELOPER PORTFOLIO</p>
        <h1 className="intro-title" ref={titleRef}>IDEAS INTO <span>IMPACT.</span></h1>
        <p className="intro-caption" ref={captionRef}>Full-stack engineering <b>·</b> AI applications <b>·</b> bold problem-solving</p>
      </div>

      <div className="intro-bottomline" ref={bottomLineRef}>
        <div className="intro-status"><span className="intro-live-dot" /> PORTFOLIO SYSTEM <strong>ONLINE</strong></div>
        <div className="intro-progress-copy"><span>PREPARING YOUR EXPERIENCE</span><strong aria-live="polite">{String(progress).padStart(3, '0')}<small>%</small></strong></div>
        <div className="intro-progress-track"><span ref={progressBarRef} /></div>
      </div>
      <div className="intro-flash" ref={flashRef} aria-hidden="true" />
    </div>
  );
}
