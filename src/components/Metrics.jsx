import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { playGeigerTick } from '../audio/AudioEngine';
import './Metrics.css';

gsap.registerPlugin(ScrollTrigger);

const HACKATHONS = [
  {
    rank: 'TOP 6 POSITION',
    event: 'HackMatrix',
    type: 'IEEE Computer Society · MITS Gwalior',
    description: 'Secured 6th place in the hackathon, standing out among participating teams with a solution-focused engineering approach.',
    medal: '🏆',
    color: '#FF5264',
  },
  {
    rank: 'FINALIST',
    event: 'Innovest 3.0',
    type: 'Chennai Institute of Technology',
    description: 'Selected as a finalist at Innovest 3.0, presenting an innovation-driven solution at a competitive technology event.',
    medal: '🚀',
    color: '#FF6B35',
  },
  {
    rank: 'FINALIST',
    event: 'Innovation Unbound',
    type: 'VIT Chennai',
    description: 'Reached finalist status at Innovation Unbound, a platform for turning practical problems into technology-led ideas.',
    medal: '✨',
    color: '#FF9A6B',
  },
  {
    rank: '1ST PRIZE',
    event: 'Selfe Hackathon',
    type: 'Inter-College Hackathon',
    description: 'Won first prize for an Environmental Pollution Controller & Reducer Application, focused on practical environmental impact.',
    medal: '🥇',
    color: '#FFD700',
  },
  {
    rank: '2ND PRIZE',
    event: 'Freshathon',
    type: 'Department Hackathon',
    description: 'Secured runner-up after multiple project evaluation rounds, demonstrating strong engineering execution and product thinking.',
    medal: '🥈',
    color: '#D9D9D9',
  },
  {
    rank: '3RD PRIZE',
    event: 'Coding Carnival',
    type: 'Sri Eshwar Coding Carnival',
    description: 'Placed third across technical rounds covering SQL queries, ER diagrams, database normalization, and debugging.',
    medal: '🥉',
    color: '#CD7F32',
  },
  {
    rank: 'NATIONAL FINALIST',
    event: 'FixForward Ideathon',
    type: 'National-Level Ideathon',
    description: 'Shortlisted for the grand finale as a Top 50 team from 1,495 participating teams.',
    medal: '🏅',
    color: '#FF2A2A',
  },
];

const TELEMETRY = [
  { platform: 'LeetCode', metrics: [
    { label: 'Problems Solved', value: 350, suffix: '+' },
    { label: 'Global Rank', value: 406636, suffix: '' },
    { label: 'Contest Rating', value: 1495, suffix: '' },
  ]},
  { platform: 'HackerRank', metrics: [
    { label: 'C Proficiency', value: 3, suffix: '★', label2: 'Stars' },
    { label: 'Python Proficiency', value: 3, suffix: '★', label2: 'Stars' },
    { label: 'C++ Proficiency', value: 2, suffix: '★', label2: 'Stars' },
  ]},
  { platform: 'SkillRack', metrics: [
    { label: 'Challenges Cleared', value: 1000, suffix: '+' },
    { label: 'Global Rank', value: 26002, suffix: '' },
  ]},
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const steps = 60;
        const increment = target / steps;
        let tickInterval;
        let frame = 0;

        tickInterval = setInterval(() => {
          frame++;
          start = Math.min(start + increment, target);
          setValue(Math.floor(start));
          playGeigerTick();
          if (frame >= steps) {
            clearInterval(tickInterval);
            setValue(target);
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="metric-counter-value">
      {value.toLocaleString()}{suffix}
    </span>
  );
}

export default function Metrics() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hackathon-card', {
        opacity: 0, y: 50, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.hackathon-grid', start: 'top 80%' }
      });
      gsap.from('.telemetry-block', {
        opacity: 0, x: -40, stagger: 0.15, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.telemetry-grid', start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">// ACHIEVEMENT TELEMETRY</p>
        <h2 className="section-title">HACKATHONS <span>& WINS</span></h2>
        <div className="section-divider" />

        {/* Hackathon grid */}
        <div className="hackathon-grid">
          {HACKATHONS.map((h, i) => (
            <div key={i} className="hackathon-card glass-card">
              <div className="hackathon-medal">{h.medal}</div>
              <div className="hackathon-rank" style={{ color: h.color }}>
                {h.rank}
              </div>
              <h3 className="hackathon-event">{h.event}</h3>
              <p className="hackathon-type">{h.type}</p>
              <p className="hackathon-desc">{h.description}</p>
            </div>
          ))}
        </div>

        {/* Telemetry counters */}
        <div className="telemetry-section">
          <p className="section-label" style={{ marginTop: '4rem' }}>// PLATFORM TELEMETRY</p>
          <div className="telemetry-grid">
            {TELEMETRY.map((block, i) => (
              <div key={i} className="telemetry-block glass-card">
                <h4 className="telemetry-platform">{block.platform}</h4>
                <div className="telemetry-metrics">
                  {block.metrics.map((m, j) => (
                    <div key={j} className="telemetry-metric">
                      <AnimatedCounter target={m.value} suffix={m.suffix} />
                      <span className="telemetry-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
