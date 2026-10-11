import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { playDataClick } from '../audio/AudioEngine';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_DATA = [
  {
    role: 'Full Stack Developer Intern',
    company: 'Jacav Technologies Pvt. Ltd.',
    period: 'Feb 2026 — Aug 2026',
    type: 'INTERNSHIP',
    status: 'COMPLETED',
    description: [
      'Contributing to active production codebases across multiple client-facing projects.',
      'Gaining practical experience in full-stack development implementations with MERN and Java.',
      'Managing real-world software engineering lifecycle workflows — from design to deployment.',
      'Collaborating directly under senior industry mentors, applying agile methodologies.',
    ],
    tags: ['Full Stack', 'Production', 'MERN', 'Java', 'Agile'],
    certLink: 'https://drive.google.com/drive/folders/16P9yuzPdzgz0r8l0Iz9lpPWxgm3DRG6y?usp=sharing',
  },
  {
    role: 'MERN Stack Intern',
    company: 'BYTS Lab',
    period: 'Dec 2025',
    type: 'TRAINING',
    status: 'COMPLETED',
    description: [
      'Underwent intensive, hands-on architectural training in the MERN stack ecosystem.',
      'Developed full-stack web platforms using MongoDB, Express.js, React.js, and Node.js.',
      'Solidified core design patterns for REST API integrations and unified frontend-backend lifecycles.',
      'Built production-grade web applications under tight mentorship supervision.',
    ],
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    certLink: 'https://drive.google.com/file/d/1DkxJ_4Qf0qAmIg_maIbPKB959rmTeaX6/view?usp=sharing',
  },
];

function ExperiencePanel({ data, index }) {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef();

  const toggle = () => {
    playDataClick();
    setExpanded(e => !e);
  };

  useEffect(() => {
    if (!bodyRef.current) return;
    if (expanded) {
      gsap.to(bodyRef.current, {
        height: 'auto', opacity: 1,
        duration: 0.5, ease: 'power3.out',
        onStart: () => { bodyRef.current.style.display = 'block'; }
      });
    } else {
      gsap.to(bodyRef.current, {
        height: 0, opacity: 0,
        duration: 0.4, ease: 'power3.in',
        onComplete: () => { bodyRef.current.style.display = 'none'; }
      });
    }
  }, [expanded]);

  return (
    <div
      className={`exp-panel glass-card ${expanded ? 'expanded' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Header — always visible */}
      <div className="exp-header" onClick={toggle}>
        <div className="exp-header-left">
          <div className="exp-header-top">
            <span className="exp-type">{data.type}</span>
            <span className={`exp-status ${data.status === 'ACTIVE' ? 'exp-status--active' : ''}`}>
              {data.status === 'ACTIVE' && <span className="exp-status-dot" />}
              {data.status}
            </span>
          </div>
          <h3 className="exp-role">{data.role}</h3>
          <div className="exp-meta">
            <span className="exp-company">{data.company}</span>
            <span className="exp-sep">|</span>
            <span className="exp-period">{data.period}</span>
          </div>
        </div>
        <button className={`exp-toggle-btn ${expanded ? 'rotated' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Expandable body */}
      <div ref={bodyRef} className="exp-body" style={{ height: 0, opacity: 0, display: 'none', overflow: 'hidden' }}>
        <div className="exp-body-inner">
          <div className="exp-divider" />
          <ul className="exp-list">
            {data.description.map((d, i) => (
              <li key={i} className="exp-list-item">
                <span className="exp-bullet">▸</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="exp-tags">
            {data.tags.map((tag, i) => (
              <span key={i} className="pill">{tag}</span>
            ))}
          </div>

          {data.certLink && data.certLink !== '#' && (
            <div style={{ marginTop: '2rem' }}>
              <a href={data.certLink} target="_blank" rel="noopener noreferrer" className="btn-red">
                View Certificate ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-panel', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-list-wrap',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">// INDUSTRY EXPERIENCE</p>
        <h2 className="section-title">WORK <span>HISTORY</span></h2>
        <div className="section-divider" />

        <div className="exp-list-wrap">
          {EXPERIENCE_DATA.map((item, i) => (
            <ExperiencePanel key={i} data={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
