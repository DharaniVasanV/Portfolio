import './Certifications.css';

const CERTS_DATA = [
  { name: 'Advanced Diploma in Python', issuer: 'CSC', year: '2024' },
  { name: 'Problem Solving through Programming in C', issuer: 'NPTEL', year: '2025', link: 'https://drive.google.com/file/d/1GvZP0xUpQ3usOpXvcKN4smjVrepnOvhU/view?usp=sharing' },
  { name: 'Career Essentials in Data Analysis', issuer: 'Microsoft & LinkedIn', year: '2025', link: 'https://www.linkedin.com/learning/certificates/bf37a4aa88394208385fd658cb1ed51b0a5fcab9bd82f4355a83e27644177335?trk=share_certificate' },
  { name: 'Google Analytics Certification', issuer: 'Google', year: '2025', link: 'https://skillshop.credential.net/51ec62cc-eb9d-4247-b0c2-3f6894ae5764#acc.mhVK0Q9L' },
  { name: 'Programming in Modern C++', issuer: 'NPTEL', year: '2025', link: 'https://drive.google.com/file/d/1d2xYE8ASIJdSmDbqJaN0IX2GZ-BwKgaD/view?usp=sharing' },
  { name: 'Data Visualization with PowerBI', issuer: 'Great Learning', year: '2025', link: 'https://olympus.mygreatlearning.com/courses/30824/certificate?pb_id=581' },
  { name: 'Programming in Java for Beginners', issuer: 'Udemy', year: '2025', link: 'https://www.udemy.com/certificate/UC-5d50084a-f07b-4c46-887e-3a8a25ad18c0/' },
];

// Double the array for seamless scroll loop
const DOUBLED = [...CERTS_DATA, ...CERTS_DATA];

export default function Certifications() {
  return (
    <section id="certifications" className="section certs-section">
      <div className="container">
        <p className="section-label">// PROFESSIONAL CERTIFICATIONS</p>
        <h2 className="section-title">CERTIFIED <span>COMPETENCIES</span></h2>
        <div className="section-divider" />
      </div>

      <div className="certs-marquee-wrap">
        <div className="certs-marquee-track">
          {DOUBLED.map((cert, i) => {
            const isClickable = cert.link && cert.link !== '#';
            const CardWrap = isClickable ? 'a' : 'div';
            return (
              <CardWrap
                key={i}
                href={isClickable ? cert.link : undefined}
                target={isClickable ? "_blank" : undefined}
                rel={isClickable ? "noopener noreferrer" : undefined}
                className={`cert-card glass-card ${isClickable ? 'clickable-cert' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit', outline: 'none' }}
              >
                <div className="cert-card-inner">
                  <div className="cert-badge">◈</div>
                  <div>
                    <p className="cert-name">{cert.name}</p>
                    <div className="cert-meta">
                      <span className="cert-issuer">{cert.issuer}</span>
                      <span className="cert-year">{cert.year}</span>
                    </div>
                  </div>
                </div>
              </CardWrap>
            );
          })}
        </div>
      </div>

      {/* Also show a grid for accessibility */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="certs-grid">
          {CERTS_DATA.map((cert, i) => {
            const isClickable = cert.link && cert.link !== '#';
            const GridWrap = isClickable ? 'a' : 'div';
            return (
              <GridWrap
                key={i}
                href={isClickable ? cert.link : undefined}
                target={isClickable ? "_blank" : undefined}
                rel={isClickable ? "noopener noreferrer" : undefined}
                className={`cert-grid-item ${isClickable ? 'clickable-cert' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="cert-grid-dot">▸</span>
                <div>
                  <p className="cert-grid-name">{cert.name} {isClickable && '↗'}</p>
                  <p className="cert-grid-meta">{cert.issuer} — {cert.year}</p>
                </div>
              </GridWrap>
            );
          })}
        </div>
      </div>
    </section>
  );
}
