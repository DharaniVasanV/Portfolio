import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_DATA = [
  {
    period: '2024 — 2028',
    level: 'UNDERGRADUATE',
    institution: 'Sri Eshwar College of Engineering',
    degree: 'B.Tech — Computer Science & Business Systems (CSBS)',
    grade: '8.28 CGPA',
    gradeLabel: 'Current (Up to 3rd Sem)',
    icon: '🎓',
    active: true,
  },
  {
    period: '2022 — 2024',
    level: 'HIGHER SECONDARY',
    institution: 'TMHNU Matriculation Higher Sec School',
    degree: 'Class XII — Science Stream',
    grade: '90.5%',
    gradeLabel: 'Final Grade',
    icon: '📘',
    active: false,
  },
  {
    period: '2021 — 2022',
    level: 'SECONDARY',
    institution: 'TMHNU Matriculation Higher Sec School',
    degree: 'Class X — SSLC',
    grade: '90.8%',
    gradeLabel: 'Final Grade',
    icon: '📗',
    active: false,
  },
];

export default function Education() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-node', {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.edu-timeline',
          start: 'top 80%',
        },
      });

      gsap.from('.edu-line-progress', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.edu-timeline',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">// ACADEMIC TIMELINE</p>
        <h2 className="section-title">EDUCATION <span>RECORDS</span></h2>
        <div className="section-divider" />

        <div className="edu-timeline">
          {/* Vertical line */}
          <div className="edu-line">
            <div className="edu-line-progress" />
          </div>

          {EDUCATION_DATA.map((item, i) => (
            <div key={i} className={`edu-node ${item.active ? 'edu-node--active' : ''}`}>
              {/* Timeline dot */}
              <div className="edu-dot">
                <div className="edu-dot-inner" />
                {item.active && <div className="edu-dot-pulse" />}
              </div>

              {/* Card */}
              <div className="edu-card glass-card">
                <div className="edu-card-header">
                  <div>
                    <span className="edu-level">{item.level}</span>
                    <span className="edu-period">{item.period}</span>
                  </div>
                  {item.active && <span className="edu-active-badge">ACTIVE</span>}
                </div>

                <h3 className="edu-institution">{item.institution}</h3>
                <p className="edu-degree">{item.degree}</p>

                <div className="edu-grade-row">
                  <div className="edu-grade-display">
                    <span className="edu-grade-value">{item.grade}</span>
                    <span className="edu-grade-label">{item.gradeLabel}</span>
                  </div>

                  {/* Visual grade bar */}
                  <div className="edu-grade-bar-wrap">
                    <div
                      className="edu-grade-bar"
                      style={{
                        width: item.grade.includes('CGPA')
                          ? `${(parseFloat(item.grade) / 10) * 100}%`
                          : item.grade.replace('%', '') + '%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
