import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { playSkillBlip } from '../audio/AudioEngine';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: 'PROGRAMMING LANGUAGES',
    icon: '</>', 
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript'],
  },
  {
    category: 'FRAMEWORKS & LIBRARIES',
    icon: '⚙',
    skills: ['React', 'Node.js', 'Express.js', 'Django', 'Flask', 'REST APIs'],
  },
  {
    category: 'DATABASES & STORAGE',
    icon: '⬡',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'TOOLS & PLATFORMS',
    icon: '◈',
    skills: ['GitHub', 'Git', 'Figma', 'Canva', 'Vite', 'Vercel'],
  },
  {
    category: 'SPOKEN LANGUAGES',
    icon: '◉',
    skills: ['Tamil', 'English'],
  },
];

function SkillPill({ skill }) {
  return (
    <span
      className="skill-pill pill"
      onMouseEnter={() => playSkillBlip()}
    >
      {skill}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">// TOOLKIT MATRIX</p>
        <h2 className="section-title">SKILLS <span>& TOOLS</span></h2>
        <div className="section-divider" />

        <div className="skills-grid">
          {SKILLS_DATA.map((cat, i) => (
            <div key={i} className="skill-category glass-card">
              <div className="skill-category-header">
                <span className="skill-category-icon">{cat.icon}</span>
                <span className="skill-category-name">{cat.category}</span>
              </div>
              <div className="skill-pills">
                {cat.skills.map((skill, j) => (
                  <SkillPill key={j} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
