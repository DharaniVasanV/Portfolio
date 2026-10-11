import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { playCameraShutter } from '../audio/AudioEngine';
import './Projects.css';

/* ── WebGL Project Assets ── */
function AnatomyMesh() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.2;
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05); // Pulsing
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.5, 0.3, 100, 16]} />
      <meshStandardMaterial color="#FF2A2A" wireframe opacity={0.6} transparent />
    </mesh>
  );
}

function CodeMatrixCube() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta * 0.4;
    ref.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial color="#FF4444" wireframe opacity={0.5} transparent />
      </mesh>
      <mesh scale={0.5}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial color="#FFFFFF" opacity={0.2} transparent wireframe />
      </mesh>
    </group>
  );
}

function AIAnalyticsCore() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.8;
    ref.current.rotation.z += delta * 0.2;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color="#FF6B35" wireframe opacity={0.7} transparent />
    </mesh>
  );
}

function MultiAgentCore() {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.3;
    ref.current.rotation.x += delta * 0.12;
  });

  return (
    <group ref={ref}>
      {/* Central AI core */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#FF2A2A"
          wireframe
          emissive="#640000"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.018, 8, 96]} />
        <meshStandardMaterial color="#FF6B35" />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.45, 0.015, 8, 96]} />
        <meshStandardMaterial
          color="#FF4444"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 16 specialized AI agents */}
      {Array.from({ length: 16 }, (_, index) => {
        const angle = (index / 16) * Math.PI * 2;
        const radius = 2.05;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              Math.sin(angle * 2) * 0.18,
            ]}
          >
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#FF2A2A" : "#FFFFFF"}
              emissive="#FF2A2A"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}


const ASSET_MAP = {
  opteraai: MultiAgentCore,
  'health-ai': AnatomyMesh,
  'fake-job': CodeMatrixCube,
  'finance-bot': AIAnalyticsCore,
};


gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [

  {
    id: 'opteraai',
    index: '01',
    date: 'Apr 2026',
    title: 'OPTERAAI | Multi-Agent AI Student Productivity Platform',
    tagline:
      '16 specialized AI agents working together in one intelligent productivity workspace.',

    stack: [
      'React.js',
      'Vite',
      'TypeScript',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Groq API',
      'ChromaDB',
      'Playwright',
      'Gmail API',
    ],

    features: [
      'Unified productivity dashboard integrating 16 specialized AI agents for academic and professional workflows.',
      'Email intelligence and meeting assistance to organize communications and manage follow-ups.',
      'Document processing, research assistance, and personal knowledge management.',
      'Career support, learning assistance, scheduling, and application automation.',
      'Notifications, analytics, shared context, and automated workflows that reduce repetitive tasks.',
    ],

    accentColor: '#FF2A2A',
    category: 'MULTI-AGENT AI // PRODUCTIVITY',

    // Replace '#' with your actual OpteraaI GitHub repository URL.
    github: 'https://github.com/DharaniVasanV/OpteraAI-HackMatrix2026',
  },
  {
    id: 'health-ai',
    index: '02',
    date: 'Apr 2026',
    title: 'AI-Powered Personalized Health Analysis & Clinic Support Platform',
    tagline: 'Intelligent health companion with 3D anatomy & emergency response',
    stack: ['React', 'JavaScript', 'Vite', 'Three.js', 'React Three Fiber', 'Vercel', 'MongoDB', 'JWT', 'Hugging Face'],
    features: [
      'Personalized AI health companion with interactive 3D anatomy system for real-time symptom tracking',
      'Dedicated mental wellness module utilizing targeted AI suggestions and mood pattern analysis',
      'Image-based witness mode for immediate emergency response assistance and triage',
      'Structured storage tracking comprehensive health profiles, symptom metrics, and mind module logs',
      'High-fidelity Clinical Dashboard for medical professionals — red-flag alerts, trend analysis, and AI-generated reports',
    ],
    accentColor: '#FF2A2A',
    category: 'HEALTH TECH // AI',
    github: 'https://github.com/DharaniVasanV/BodyMindAI',
  },
  {
    id: 'fake-job',
    index: '03',
    date: 'Jan 2026',
    title: 'AI-Based Fake Job Detection & Company Verification System',
    tagline: 'ML + NLP powered fraud detection with OCR pipeline',
    stack: ['HTML', 'CSS', 'Python', 'Django', 'PostgreSQL', 'Llama AI', 'Hugging Face', 'OCR'],
    features: [
      'Full-stack web architecture to identify and mitigate fraudulent job postings using ML & NLP algorithms',
      'Advanced OCR-based script extraction pipelines parsing text directly from job advertisement images',
      'Dynamic, real-time fraud risk markers and holistic company trust score computation',
      'Automated web cross-verification routines parsing official corporate landing pages',
      'Automated LinkedIn lookup tracking and platform review metrics scraping',
    ],
    accentColor: '#FF4444',
    category: 'AI // SECURITY',
    github: 'https://github.com/DharaniVasanV/FakeJobDetectionSystem',
  },
  {
    id: 'finance-bot',
    index: '04',
    date: 'Nov 2025',
    title: 'GenAI Personal Finance Chatbot',
    tagline: 'AI-driven budget insights with automated PDF report generation',
    stack: ['Python', 'Streamlit', 'Google Gemini AI', 'Granite Model', 'Pandas', 'Matplotlib', 'CSV'],
    features: [
      'Automated personal financial tracking and ledger allocation suite with expense classification',
      'Rich, highly interactive analytical data visualizations with AI-driven budget threshold insights',
      'Tailored financial consulting recommendations powered by Google Gemini AI',
      'Integrated rendering engine parsing monthly spending logs into comprehensive PDF reports',
      'Embedded localized data summary tables and structural vector charts in exported documents',
    ],
    accentColor: '#FF6B35',
    category: 'FINTECH // GENAI',
    github: 'https://github.com/DharaniVasanV/genai-finance-chatbot',
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const carouselRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.from('.projects-carousel-wrap', {
        opacity: 0, y: 60, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const slide = (dir) => {
    if (animating) return;
    playCameraShutter();
    setAnimating(true);

    const el = carouselRef.current;
    gsap.to(el, {
      x: dir > 0 ? -60 : 60, opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setCurrent(c => (c + dir + PROJECTS_DATA.length) % PROJECTS_DATA.length);
        gsap.fromTo(el,
          { x: dir > 0 ? 60 : -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out', onComplete: () => setAnimating(false) }
        );
      }
    });
  };

  const project = PROJECTS_DATA[current];
  const ActiveAsset = ASSET_MAP[project.id];

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="projects-header">
          <p className="section-label">// PROJECT REGISTRY</p>
          <h2 className="section-title">ENGINEERED <span>SYSTEMS</span></h2>
          <div className="section-divider" />
        </div>

        <div className="projects-carousel-wrap">
          {/* Slide navigation */}
          <div className="projects-nav-row">
            <div className="projects-counter">
              <span className="projects-counter-current">{String(current + 1).padStart(2, '0')}</span>
              <span className="projects-counter-sep"> / </span>
              <span className="projects-counter-total">{String(PROJECTS_DATA.length).padStart(2, '0')}</span>
            </div>
            <div className="projects-dots">
              {PROJECTS_DATA.map((_, i) => (
                <button
                  key={i}
                  className={`projects-dot ${i === current ? 'active' : ''}`}
                  onClick={() => { if (i !== current) { const dir = i > current ? 1 : -1; slide(dir); } }}
                />
              ))}
            </div>
            <div className="projects-arrows">
              <button className="projects-arrow" onClick={() => slide(-1)}>◀</button>
              <button className="projects-arrow" onClick={() => slide(1)}>▶</button>
            </div>
          </div>

          {/* Project card */}
          <div className="projects-card glass-card" ref={carouselRef} style={{ position: 'relative' }}>

            {/* Interactive 3D WebGL Layer */}
            <div className="project-webgl-asset" style={{ position: 'absolute', right: '1rem', top: '1rem', width: '120px', height: '120px', pointerEvents: 'none', opacity: 0.8 }}>
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 2, 2]} intensity={2} />
                {ActiveAsset && <ActiveAsset />}
              </Canvas>
            </div>

            <div className="projects-card-top">
              <div className="projects-index-badge">{project.index}</div>
              <div>
                <span className="projects-category">{project.category}</span>
                <span className="projects-date">{project.date}</span>
              </div>
            </div>

            <h3 className="projects-title">{project.title}</h3>
            <p className="projects-tagline">{project.tagline}</p>

            <div className="projects-body">
              {/* Features */}
              <div className="projects-features">
                <p className="projects-features-label">// SYSTEM FEATURES</p>
                <ul className="projects-feature-list">
                  {project.features.map((f, i) => (
                    <li key={i} className="projects-feature-item">
                      <span className="projects-feature-bullet">▸</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="projects-stack">
                <p className="projects-features-label">// TECH STACK</p>
                <div className="projects-stack-pills">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="pill">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {project.github && project.github !== '#' && (
                <div style={{ marginTop: '2rem' }}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-red" style={{ padding: '0.6rem 1.25rem', fontSize: '0.7rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px', verticalAlign: '-2px' }}>
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Source ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Preview mini cards */}
          <div className="projects-preview-row">
            {PROJECTS_DATA.map((p, i) => (
              <div
                key={i}
                className={`projects-preview-card ${i === current ? 'active' : ''}`}
                onClick={() => { if (i !== current) { const dir = i > current ? 1 : -1; slide(dir); } }}
              >
                <span className="projects-preview-num">{p.index}</span>
                <span className="projects-preview-title">{p.title.substring(0, 42)}…</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
