import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { playSkillBlip } from '../audio/AudioEngine';
import './TechStack.css';

import {
  siPython, siC, siCplusplus, siJavascript,
  siReact, siNodedotjs, siExpress, siDjango, siFlask, siSpringboot,
  siMongodb, siPostgresql, siMysql,
  siGithub, siGit, siFigma
} from 'simple-icons/icons';

gsap.registerPlugin(ScrollTrigger);

// Custom mock object for Java/REST configs when simple-icons exact matching varies
const customJava = { title: 'Java', hex: '007396', path: 'M16.143 14.887c-1.127.674-3.411 1.054-5.26 1.054-3.13 0-5.83-.559-6.906-1.429C2.464 13.284 5 11.83 8.32 11.5c-4.498.423-6.685 1.583-6.685 2.664 0 1.259 3.013 2.146 7.429 2.146 3.655 0 6.64-1.042 7.078-2.607.009-.089 0-.613-.001-.816Zm1.213-2c-.933.456-2.671.748-4.225.807 4.093-.244 6.772-1.258 6.772-2.316 0-1.166-3.033-2.094-7.468-2.094-3.322 0-6.191.758-7.1 1.839 1.503-1.411 4.791-1.921 7.643-1.921 4.75 0 7.915 1.455 7.915 2.825 0 .285-.316.593-.655.882l-.936.425ZM11.026 8.56c-4.321 0-7.258-.87-7.258-2.035 0-1.229 3.197-2.127 7.688-2.127 4.542 0 7.74 1.107 7.74 2.196 0 .506-1.536 1.12-2.909 1.401 1.761-.595 2.453-1.144 2.453-1.583 0-.913-2.585-1.749-6.862-1.749-4.237 0-6.904.776-6.904 1.637 0 .503.791 1.066 3.336 1.5l1.966.52c-1.428.163-5.263.292-6.166-.239 1.054 1.157 5.093 1.347 7.054 1.309a47.53 47.53 0 0 0-1.5-.729-.63.63 0 0 0-.251-.08l-.391.037v-.058Z' };
const customRest = { title: 'REST APIs', hex: 'FF2A2A', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z' };
const customCanva = { title: 'Canva', hex: '00C4CC', path: 'M14.536 7.464a5 5 0 0 0-7.072 0l-4.95 4.95a5 5 0 1 0 7.072 7.072l4.95-4.95a5 5 0 0 0 0-7.072zm-1.414 5.658l-4.95 4.95a3 3 0 1 1-4.242-4.242l4.95-4.95a3 3 0 1 1 4.242 4.242zM19.485 2.515a5 5 0 0 0-7.071 0l-2.121 2.121a1 1 0 0 0 1.414 1.414l2.121-2.121a3 3 0 0 1 4.243 4.243l-4.95 4.95a1 1 0 1 0 1.414 1.414l4.95-4.95a5 5 0 0 0 0-7.071z' };
const customColab = { title: 'Google Colab', hex: 'F9AB00', path: 'M16.9414 4.9757a7.033 7.033 0 0 0-4.9308 2.0646 7.033 7.033 0 0 0-.1232 9.8068l2.395-2.395a3.6455 3.6455 0 0 1 5.1497-5.1478l2.397-2.3989a7.033 7.033 0 0 0-4.8877-1.93Zm-3.1364 8.7831l-2.3854 2.3844a3.6436 3.6436 0 0 1-5.1458-5.1458l2.3854-2.3854A7.035 7.035 0 0 0 7.0642 19.025a7.035 7.035 0 0 0 9.8637.106l-3.1234-3.1235v-.1986l.0005-.25Z' };

const customThreejs = { title: 'Three.js', hex: 'FFFFFF', path: 'M16.5 0l-9 4-.37.16v18.77l10.87-5.04V7.5L16.5 0zm-8.6 3.63L16.5 12h-9V3.63zM16.5 12l8.63 4.2V24l-8.63-4.2V12z' };
const customVite = { title: 'Vite', hex: '646CFF', path: 'M23.6 4.3L12.5 24 1.4 4.3l11.1-2.9 11.1 2.9zm-4.3 3.3L12.5 20.3 5.3 7.6 12.5 5.5l7 2.1z' };
const customHuggingface = { title: 'Hugging Face', hex: 'FFD21E', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z' }; 
const customGemini = { title: 'Google Gemini', hex: '8E75FF', path: 'M12 1L8.5 8.5 1 12l7.5 3.5L12 23l3.5-7.5L23 12l-7.5-3.5z' };
const customStreamlit = { title: 'Streamlit', hex: 'FF4B4B', path: 'M12 2L2 7l10 5 10-5-10-5zm0 8L2 15l10 5 10-5-10-5z' };
const customPandas = { title: 'Pandas', hex: '150458', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' };
const customVercel = { title: 'Vercel', hex: 'FFFFFF', path: 'M12 1L24 22H0Z' };

// Cloud & DevOps custom icons
const customDocker = { title: 'Docker', hex: '2496ED', path: 'M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z' };
const customK8s = { title: 'Kubernetes', hex: '326CE5', path: 'M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005zm-.936-2.74a.632.632 0 0 1 .03.404l.009.038-2.53.428-.003.006c-.312-1.049-.312-2.164 0-3.213l2.53.43-.01.038a.633.633 0 0 1-.026.87zm1.81-2.055l-.003.006-2.413-.999a5.17 5.17 0 0 1 2.596-2.075l.437 2.578-.617.49zm2.55-.12a.633.633 0 0 1-.404.03l-.038.009-.43-2.53-.006-.003c1.05-.312 2.165-.312 3.214 0l-.43 2.53-.038-.01a.633.633 0 0 1-.869-.026zm2.054 1.81l-.006-.003.999-2.413a5.171 5.171 0 0 1 2.075 2.597l-2.578.437-.004-.003a.633.633 0 0 1-.486-.615zm.936 2.74a.633.633 0 0 1-.03-.404l-.009-.038 2.53-.43.003-.006c.312 1.049.312 2.164 0 3.213l-2.53-.43.01-.038a.633.633 0 0 1 .026-.867zm-1.81 2.055l.003-.006 2.413.999a5.17 5.17 0 0 1-2.596 2.075l-.437-2.578.617-.49zm-2.55.12a.633.633 0 0 1 .404-.03l.038-.009.43 2.53.006.003c-1.05.312-2.165.312-3.214 0l.43-2.53.038.01a.633.633 0 0 1 .868.026zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.539a6.54 6.54 0 1 1 0-13.079 6.54 6.54 0 0 1 0 13.08z' };
const customAWS = { title: 'AWS', hex: 'FF9900', path: 'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.472c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.839.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zm1.085-1.237c-.335-.432-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z' };
const customGCP = { title: 'Google Cloud', hex: '4285F4', path: 'M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893C.9 9.703-.055 11.533.005 13.986c.08 3.232 2.818 5.803 6.028 5.803h12.03a5.023 5.023 0 0 0 4.974-5.014c0-.669-.14-1.3-.38-1.88a5.016 5.016 0 0 0-4.595-3.093h-.044c-.633-3.893-4.03-6.883-7.83-6.883-.084 0-.166.003-.248.005h.249z' };
const customFirebase = { title: 'Firebase', hex: 'FFCA28', path: 'M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z' };

const TECH_MATRIX = [
  {
    category: 'CLOUD & DEVOPS INFRASTRUCTURE',
    icon: '☁',
    items: [
      { id: 'docker', label: 'Docker', iconDef: customDocker },
      { id: 'k8s', label: 'Kubernetes', iconDef: customK8s },
      { id: 'aws', label: 'AWS', iconDef: customAWS },
      { id: 'gcp', label: 'GCP', iconDef: customGCP },
      { id: 'firebase', label: 'Firebase', iconDef: customFirebase },
    ],
  },
  {
    category: 'PROGRAMMING LANGUAGES',
    icon: '</>',
    items: [
      { id: 'python', label: 'Python', iconDef: siPython },
      { id: 'c', label: 'C', iconDef: siC },
      { id: 'cpp', label: 'C++', iconDef: siCplusplus },
      { id: 'java', label: 'Java', iconDef: customJava },
      { id: 'javascript', label: 'JavaScript', iconDef: siJavascript },
    ],
  },
  {
    category: 'FRAMEWORKS & ECOSYSTEMS',
    icon: '⚙',
    items: [
      { id: 'react', label: 'React', iconDef: siReact },
      { id: 'node', label: 'Node.js', iconDef: siNodedotjs },
      { id: 'express', label: 'Express.js', iconDef: { ...siExpress, hex: 'A9A9A9' } },
      { id: 'django', label: 'Django', iconDef: siDjango },
      { id: 'flask', label: 'Flask', iconDef: { ...siFlask, hex: 'FF2A2A' } },
      { id: 'spring', label: 'Spring Boot', iconDef: siSpringboot },
      { id: 'rest', label: 'REST APIs', iconDef: customRest },
    ],
  },
  {
    category: 'SPECIALIZED TECH & AI LAYERS',
    icon: '◈',
    items: [
      { id: 'threejs', label: 'Three.js / R3F', iconDef: customThreejs },
      { id: 'vite', label: 'Vite', iconDef: customVite },
      { id: 'huggingface', label: 'Hugging Face', iconDef: customHuggingface },
      { id: 'gemini', label: 'Google Gemini', iconDef: customGemini },
      { id: 'streamlit', label: 'Streamlit', iconDef: customStreamlit },
      { id: 'pandas', label: 'Pandas', iconDef: customPandas },
      { id: 'vercel', label: 'Vercel', iconDef: customVercel },
    ],
  },
  {
    category: 'DATABASES & STORAGE',
    icon: '⬡',
    items: [
      { id: 'mongodb', label: 'MongoDB', iconDef: siMongodb },
      { id: 'postgresql', label: 'PostgreSQL', iconDef: siPostgresql },
      { id: 'mysql', label: 'MySQL', iconDef: siMysql },
    ],
  },
  {
    category: 'TOOLS & PLATFORMS',
    icon: '❖',
    items: [
      { id: 'github', label: 'GitHub / Git', iconDef: siGithub },
      { id: 'figma', label: 'Figma', iconDef: siFigma },
      { id: 'canva', label: 'Canva', iconDef: customCanva },
      { id: 'colab', label: 'Google Colab', iconDef: customColab },
    ],
  },
];

function TechCard({ item }) {
  const cardRef = useRef();
  
  const handleHover = () => {
    playSkillBlip();
  };

  const hexColor = item.iconDef.hex && item.iconDef.hex !== '000000' 
      ? `#${item.iconDef.hex.replace(/^#/, '')}` 
      : '#FFFFFF';

  return (
    <div 
      className="tech-card glass-card"
      ref={cardRef}
      onMouseEnter={handleHover}
      style={{ '--brand-color': hexColor }}
    >
      <div className="tech-card-icon-wrap">
        <svg 
          className="tech-card-icon" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={item.iconDef.path} />
        </svg>
      </div>
      <span className="tech-card-label">{item.label}</span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tech-category-block', {
        opacity: 0, 
        y: 60, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      
      gsap.from('.tech-card', {
        opacity: 0,
        scale: 0.8,
        y: 20,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <p className="section-label">// EXHAUSTIVE ENGINEERING STACK</p>
        <h2 className="section-title">TECHNICAL <span>ARSENAL</span></h2>
        <div className="section-divider" />

        <div className="tech-matrix">
          {TECH_MATRIX.map((group, idx) => (
            <div key={idx} className="tech-category-block">
              <div className="tech-category-header">
                <span className="tech-category-icon">{group.icon}</span>
                <h3 className="tech-category-title">{group.category}</h3>
              </div>
              
              <div className="tech-cards-grid">
                {group.items.map((item, j) => (
                  <TechCard key={j} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
