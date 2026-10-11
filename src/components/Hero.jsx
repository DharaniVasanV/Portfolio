import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './Hero.css';

// Scramble text function
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>';

function ScrambleText({ text, className }) {
  const elRef = useRef();
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let frame = 0;
    let raf;
    const scramble = () => {
      const progress = frame / 40;
      const revealed = Math.floor(progress * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === ' ') out += text[i];
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplayed(out);
      frame++;
      if (frame < 60) raf = requestAnimationFrame(scramble);
      else setDisplayed(text);
    };
    const timeout = setTimeout(() => { raf = requestAnimationFrame(scramble); }, 800);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [text]);

  return <span ref={elRef} className={className}>{displayed}</span>;
}

export default function Hero() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-name-line', { y: 150, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.1 });
      gsap.from('.hero-photo-wrap', { opacity: 0, scale: 0.9, duration: 0.8, delay: 0.4, ease: 'power3.out' });
      gsap.from('.hero-tag-line', { opacity: 0, y: 30, duration: 0.7, delay: 0.3 });
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.6, delay: 0.7 });
      gsap.from('.hero-contacts', { opacity: 0, y: 20, duration: 0.6, delay: 1.0 });
      gsap.from('.hero-summary', { opacity: 0, y: 30, duration: 0.8, delay: 1.2 });
      gsap.from('.hero-cta', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, delay: 1.5 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="section hero-section" ref={sectionRef}>
      <div className="container">
        {/* Status line */}
        <div className="hero-status-line">
          <span className="hero-status-dot" />
          <span className="hero-status-text">SYSTEM ONLINE // PORTFOLIO v2.0</span>
        </div>

        <div className="hero-grid-layout">
          {/* Left Column (Text) */}
          <div className="hero-left-col">
            {/* Main name - Kinetic Stacked Typography */}
            <h1 className="hero-name">
              <div className="hero-name-mask">
                <div className="hero-name-line">
                  <ScrambleText text="DHARANI" className="hero-name-first" />
                </div>
              </div>
              <div className="hero-name-mask">
                <div className="hero-name-line hero-name-line--indent">
                  <ScrambleText text="VASAN V" className="hero-name-last" />
                </div>
              </div>
            </h1>

            {/* Tag line */}
            <div className="hero-tag-line">
              <span className="hero-tag-bracket">[</span>
              <span className="hero-tag-content">Full Stack Developer</span>
              <span className="hero-tag-sep"> // </span>
              <span className="hero-tag-content">AI Applications & Engineering</span>
              <span className="hero-tag-bracket">]</span>
            </div>

            {/* Contact row */}
            <div className="hero-contacts">
              <div className="hero-contact-item">
                <span className="hero-contact-label">TEL</span>
                <a href="tel:9384389680" className="hero-contact-val">9384389680</a>
              </div>
              <div className="hero-divider" />
              <div className="hero-contact-item">
                <span className="hero-contact-label">MAIL</span>
                <a href="mailto:dharanivasan.v2024csbs@sece.ac.in" className="hero-contact-val">
                  dharanivasan.v2024csbs@sece.ac.in
                </a>
              </div>
              <div className="hero-divider" />
              <div className="hero-contact-item">
                <span className="hero-contact-label">LOC</span>
                <span className="hero-contact-val">Sri Eshwar College of Engineering</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-row">
              <a
                href="https://github.com/DharaniVasanV"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red hero-cta"
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dharani-vasan-v-5926a3333/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red hero-cta"
              >
                <LinkedinIcon /> LinkedIn
              </a>
              <a href="/assets/Dharani-Vasan-Resume.pdf" className="btn-red hero-cta" download>
                DOWNLOAD RESUME ↓
              </a>
              <button
                className="btn-red hero-cta"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                CONTACT ME
              </button>
            </div>
          </div>

          {/* Right Column (Profile Photo with Frame) */}
          <div className="hero-right-col">
            <div className="hero-photo-wrap">
              {/* Base HTML Image Tag */}
              <img 
                src="/assets/dharani-vasan-profile.jpg" 
                alt="Dharani Vasan V" 
                className="hero-profile-img"
              />
              <div className="hero-photo-frame-effects"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="hero-scroll-text">SCROLL DOWN</span>
          <div className="hero-scroll-line" />
        </div>
      </div>

      {/* Background decorations */}
      <div className="hero-bg-text">DV</div>
      <div className="hero-grid-accent" />
    </section>
  );
}

// Icons
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
