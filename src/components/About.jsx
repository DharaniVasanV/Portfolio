
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  {
    number: '01',
    title: 'AI / MACHINE LEARNING',
    subtitle: 'Building intelligent systems',
    description:
      'I am interested in machine learning, NLP, generative AI, RAG pipelines, and multi-agent systems. I enjoy exploring how models can understand context, automate complex workflows, and solve problems that traditional software alone cannot handle. Through projects such as OpteraaI, my fake job detection system, and a law-enforcement AI agent, I have explored both classical ML and modern generative AI.',
    tags: ['Machine Learning', 'NLP', 'GenAI', 'RAG', 'AI Agents'],
  },
  {
    number: '02',
    title: 'FULL-STACK DEVELOPMENT',
    subtitle: 'Turning ideas into working products',
    description:
      'I enjoy building complete applications, from designing responsive user interfaces to developing backend APIs, managing databases, and connecting external services. My experience with React, Node.js, Django, Flask, and PostgreSQL helps me approach a product as one connected system rather than a collection of isolated features. I care about usability, maintainability, and making sure the final application genuinely works.',
    tags: ['React', 'Node.js', 'Python', 'REST APIs', 'Databases'],
  },
];

const highlights = [
  { value: '16', label: 'SPECIALIZED AI AGENTS' },
  { value: '1300+', label: 'CODING PROBLEMS SOLVED' },
  { value: 'TOP 6', label: 'HACKMATRIX' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-intro', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from('.about-focus-card', {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-focus-grid',
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from('.about-highlight', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-highlights',
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="section about-section"
      ref={sectionRef}
    >
      <div className="container">
        <div className="about-intro">
          <div className="about-eyebrow">
            <span className="about-eyebrow-line" />
            <span>GET TO KNOW ME</span>
            <span className="about-eyebrow-line" />
          </div>

          <h2 className="about-heading">
            BEYOND THE
            <br />
            <span>CODE.</span>
          </h2>

          <p className="about-lead">
            Hey, I'm <strong>Dharani Vasan</strong>, a third-year
            Computer Science and Business Systems student at
            Sri Eshwar College of Engineering, Tamil Nadu.
            I'm passionate about building technology that solves
            real problems, not just building technology for the sake
            of it.
          </p>
        </div>

        <div className="about-story">
          <div className="about-story-marker">
            <span className="about-story-dot" />
            MY APPROACH
          </div>

          
        <div className="about-story-content">
            <p>
            I enjoy taking complex, real-world problems and turning them into
            practical solutions. From detecting fraudulent job postings to
            building intelligent productivity platforms, I like working across
            the entire development journey, from understanding the problem to
            shipping a working product.
            </p>

            <p>
            I'm particularly interested in both
            <strong> AI/ML and full-stack engineering</strong>. I enjoy exploring
            machine learning, generative AI, RAG pipelines, and multi-agent
            systems while also building complete applications with responsive
            interfaces, backend APIs, and databases. My goal is to connect
            intelligent technology with products people can actually use.
            </p>

            <p>
            Hackathons and personal projects have taught me to learn quickly,
            debug patiently, and work under tight deadlines. I'm continuing to
            strengthen my technical fundamentals, explore new architectures,
            and build reliable, scalable applications.
            </p>

            <p className="about-closing">
            I want to keep turning ambitious ideas into useful products,
            one problem at a time.
            </p>
        </div>
        </div>

        <div className="about-focus-grid">
          {focusAreas.map((area) => (
            <article
              className="about-focus-card"
              key={area.number}
            >
              <div className="about-card-top">
                <span className="about-card-number">
                  {area.number}
                </span>
                <span className="about-card-symbol">↗</span>
              </div>

              <h3>{area.title}</h3>
              <h4>{area.subtitle}</h4>
              <p>{area.description}</p>

              <div className="about-tags">
                {area.tags.map((tag) => (
                  <span className="about-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="about-highlights">
          {highlights.map((item) => (
            <div className="about-highlight" key={item.label}>
              <span className="about-highlight-value">
                {item.value}
              </span>
              <span className="about-highlight-label">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="about-interests">
          <span className="about-interests-label">
            CURRENTLY EXPLORING
          </span>
          <p>
            Generative AI · Machine Learning · RAG Systems ·
            Multi-Agent Workflows · Full-Stack Architecture ·
            Cloud Deployment · Scalable Applications
          </p>
        </div>
      </div>
    </section>
  );
}
