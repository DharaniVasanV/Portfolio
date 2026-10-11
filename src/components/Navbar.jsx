import { useState, useEffect } from 'react';
import { setMuted, isMuted } from '../audio/AudioEngine';
import ProfileLinks from './ProfileLinks';
import './Navbar.css';


const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'metrics', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];


function AudioIcon({ muted }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className={`audio-icon ${muted ? 'muted' : 'active'}`}>
      {[0,1,2,3].map(i => (
        <rect
          key={i}
          x={i * 5}
          y={muted ? 6 : 0}
          width="3"
          height={muted ? 4 : 16}
          rx="1.5"
          fill={muted ? 'rgba(255,255,255,0.3)' : '#FF2A2A'}
          className={`audio-bar audio-bar-${i}`}
        />
      ))}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [muted, setMutedState] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Detect active section
      const offsets = SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const current = offsets.filter(o => o.top <= 100).pop();
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        {/* Logo */}
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="nav-logo-dv">DV</span>
          <span className="nav-logo-slash">//</span>
        </div>

        {/* Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {SECTIONS.map(s => (
            <li key={s.id}>
              <button
                className={`nav-link ${active === s.id ? 'active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
                {active === s.id && <span className="nav-link-dot" />}
              </button>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="nav-controls">
          <ProfileLinks variant="navbar" />
          <button className="audio-toggle" onClick={handleMute} title={muted ? 'Unmute' : 'Mute'}>
            <AudioIcon muted={muted} />
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
