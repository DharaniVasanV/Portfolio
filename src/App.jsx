import { useState, useEffect } from 'react';
import FireSparksCanvas from './components/FireSparksCanvas';
import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Metrics from './components/Metrics';
import CustomCursor from './components/CustomCursor';
import TechStack from './components/TechStack';
import Certifications from './components/Certifications';
import ContactForm from './components/ContactForm';
import ProfileLinks from './components/ProfileLinks';
import About from './components/About';
import './App.css';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Lock scroll during intro
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <>
      {/* Custom Global Cursor Injector */}
      <CustomCursor />

      {/* Always-present fire particle background */}
      <FireSparksCanvas />

      {/* Intro loading sequence */}
      {!introComplete && (
        <IntroLoader onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main site — rendered behind (opacity transition happens inside intro) */}
      <div className={`main-site ${introComplete ? 'visible' : 'hidden'}`}>
        <Navbar />

        <main>
          <Hero />
          <About/>
          <Education />
          <Experience />
          <Projects />
          <Metrics />
          <TechStack />
          <Certifications />
          <ContactForm />
        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-logo">
                <span className="footer-dv">DV</span>
                <span className="footer-name">DHARANI VASAN V</span>
              </div>

              {/* Profile connection bar — bottom anchor */}
              <ProfileLinks variant="footer" />

              <div className="footer-right">
                <a href="mailto:dharanivasan.v2024csbs@sece.ac.in" className="footer-link">
                  dharanivasan.v2024csbs@sece.ac.in
                </a>
                <p className="footer-copy">
                  © 2026 Dharani Vasan V — All systems operational.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
