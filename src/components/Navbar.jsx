
import { useState, useEffect } from 'react';
import { setMuted } from '../audio/AudioEngine';
import ProfileLinks from './ProfileLinks';
import './Navbar.css';

const PRIMARY_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
];

const MORE_SECTIONS = [
  { id: 'education', label: 'Education' },
  { id: 'metrics', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const ALL_SECTIONS = [
  PRIMARY_SECTIONS[0],
  PRIMARY_SECTIONS[1],
  MORE_SECTIONS[0],
  PRIMARY_SECTIONS[3],
  PRIMARY_SECTIONS[2],
  ...MORE_SECTIONS.slice(1),
];

function AudioIcon({ muted }) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      className={`audio-icon ${muted ? 'muted' : 'active'}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 5}
          y={muted ? 6 : 0}
          width="3"
          height={muted ? 4 : 16}
          rx="1.5"
          fill={muted ? '#777777' : '#FF2A2A'}
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
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const updateNavigation = () => {
      setScrolled(window.scrollY > 30);

      const visibleSections = ALL_SECTIONS
        .map((section) => {
          const element = document.getElementById(section.id);

          return element
            ? {
                id: section.id,
                top: element.getBoundingClientRect().top,
              }
            : null;
        })
        .filter(Boolean);

      let current = null;

      for (const section of visibleSections) {
        if (section.top <= 130) current = section;
      }

      if (current) setActive(current.id);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setMoreOpen(false);
      }
    };

    updateNavigation();

    window.addEventListener('scroll', updateNavigation, {
      passive: true,
    });
    window.addEventListener('resize', updateNavigation);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        78;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });
    }

    setMenuOpen(false);
    setMoreOpen(false);
  };

  const handleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const moreIsActive = MORE_SECTIONS.some(
    (section) => section.id === active
  );

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <button
          className="nav-logo"
          onClick={() => scrollTo('home')}
          aria-label="Go to homepage"
        >
          <span className="nav-logo-dv">DV</span>
          <span className="nav-logo-slash">//</span>
        </button>

        {/* Main desktop navigation */}
        <div className="nav-center">
        <ul className="nav-primary">
          {PRIMARY_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                className={`nav-link ${
                  active === section.id ? 'active' : ''
                }`}
                onClick={() => scrollTo(section.id)}
                aria-current={
                  active === section.id ? 'location' : undefined
                }
              >
                {section.label}
                {active === section.id && (
                  <span className="nav-link-dot" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Secondary desktop navigation */}
        <div className="nav-more">
          
          <button
            className={`nav-link nav-more-trigger ${
              moreIsActive ? 'active' : ''
            }`}
            onClick={() => setMoreOpen((open) => !open)}
            aria-expanded={moreOpen}
            aria-haspopup="true"
          >
            <span>MORE</span>

            <svg
              className={`nav-chevron ${moreOpen ? 'rotated' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 5.75L8 10.25L12.5 5.75"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>


          {moreOpen && (
            <ul className="nav-more-menu">
              {MORE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    className={`nav-more-link ${
                      active === section.id ? 'active' : ''
                    }`}
                    onClick={() => scrollTo(section.id)}
                  >
                    <span>{section.label}</span>

                    {active === section.id && (
                      <span className="nav-more-indicator" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>

        {/* Desktop social links and audio */}
        <div className="nav-controls">
          <ProfileLinks variant="navbar" />

          <button
            className="audio-toggle"
            onClick={handleMute}
            title={muted ? 'Unmute audio' : 'Mute audio'}
            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          >
            <AudioIcon muted={muted} />
          </button>

          <button
            className={`hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => {
              setMenuOpen((open) => !open);
              setMoreOpen(false);
            }}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Responsive menu for narrow or zoomed-in viewports */}
      <div
        className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <p className="nav-mobile-label">// NAVIGATE</p>

        <div className="nav-mobile-grid">
          {ALL_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              tabIndex={menuOpen ? 0 : -1}
              className={`nav-mobile-link ${
                active === section.id ? 'active' : ''
              }`}
              onClick={() => scrollTo(section.id)}
            >
              <span className="nav-mobile-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{section.label}</span>

              {active === section.id && (
                <span className="nav-mobile-active-dot" />
              )}
            </button>
          ))}
        </div>

        <div className="nav-mobile-footer">
          <span>DHARANI VASAN V</span>
          <span>BUILDING WHAT MATTERS.</span>
        </div>
      </div>
    </nav>
  );
}
