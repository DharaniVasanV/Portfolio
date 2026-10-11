import { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { playUplink, playSuccessPing, playDataClick } from '../audio/AudioEngine';
import ProfileLinks from './ProfileLinks';
import './ContactForm.css';

/**
 * EmailJS Configuration
 * ─────────────────────────────────────────────────
 * To activate real email delivery:
 *  1. Create a free account at https://www.emailjs.com/
 *  2. Create an Email Service (Gmail / Outlook / etc.)
 *  3. Create an Email Template — use variables: {{from_name}}, {{from_email}}, {{message}}
 *  4. Replace the three constants below with your actual IDs:
 *
 *  EMAILJS_SERVICE_ID  → Your Service ID (e.g., "service_abc123")
 *  EMAILJS_TEMPLATE_ID → Your Template ID (e.g., "template_xyz789")
 *  EMAILJS_PUBLIC_KEY  → Your Public Key (e.g., "user_ABCDEFGH")
 *
 * Emails will be delivered to: dharanivasan.v2024csbs@sece.ac.in
 */
const EMAILJS_SERVICE_ID = 'service_p8dvh4x';
const EMAILJS_TEMPLATE_ID = 'template_uaav4ec';
const EMAILJS_PUBLIC_KEY = 'pnlwCbGK4LUnR33fx';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef();

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    playDataClick();
  };

  useEffect(() => {
    // Only initialize if real credentials are present
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Guard: detect unconfigured placeholder credentials
    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    playUplink();

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      e.target,
      EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
       console.log('SUCCESS!', result.status, result.text);
       setStatus('success');
       playSuccessPing();
       setForm({ name: '', email: '', message: '' });
       setTimeout(() => { setStatus('idle'); }, 4000);
    }, (error) => {
       console.error('FAILED...', error);
       setStatus('error');
    });
  };

  const isLocked = status === 'sending' || status === 'success';

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="section-label">// SECURE CONTACT PORTAL</p>
        <h2 className="section-title">OPEN <span>CHANNEL</span></h2>
        <div className="section-divider" />

        <div className="contact-layout">
          {/* Info panel */}
          <div className="contact-info">
            <div className="contact-info-card glass-card">
              <p className="contact-info-header">// DIRECT UPLINK</p>
              <div className="contact-info-items">
                <div className="contact-info-item">
                  <span className="contact-info-label">EMAIL</span>
                  <a href="mailto:dharanivasan.v2024csbs@sece.ac.in" className="contact-info-val">
                    dharanivasan.v2024csbs@sece.ac.in
                  </a>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">PHONE</span>
                  <a href="tel:9384389680" className="contact-info-val">9384389680</a>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-label">LOCATION</span>
                  <span className="contact-info-val">Sri Eshwar College of Engineering</span>
                </div>
              </div>
              <div className="contact-social">
                <ProfileLinks variant="footer" />
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="contact-form-wrap">
            <form
              ref={formRef}
              className="contact-form glass-card"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* Success overlay */}
              {status === 'success' && (
                <div className="contact-success-overlay">
                  <div className="contact-success-icon">✓</div>
                  <p className="contact-success-msg">
                    [ TRANSMISSION SUCCESSFUL — INBOX DELIVERY SECURED ]
                  </p>
                  <button
                    type="button"
                    className="btn-red"
                    onClick={() => setStatus('idle')}
                  >
                    SEND ANOTHER
                  </button>
                </div>
              )}

              <p className="contact-form-header">// COMPOSE MESSAGE</p>

              <div className="contact-field-group">
                <div className="contact-field">
                  <label className="contact-label" htmlFor="field-name">IDENTIFIER</label>
                  <input
                    id="field-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={isLocked}
                    required
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label" htmlFor="field-email">RETURN ADDRESS</label>
                  <input
                    id="field-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isLocked}
                    required
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label" htmlFor="field-message">PAYLOAD</label>
                <textarea
                  id="field-message"
                  name="message"
                  placeholder="Your message..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={isLocked}
                  required
                  rows="6"
                  className="contact-input contact-textarea"
                />
              </div>

              <button
                type="submit"
                className={`contact-submit ${status === 'sending' ? 'loading' : ''}`}
                disabled={isLocked}
              >
                {status === 'sending' ? (
                  <>
                    <span className="contact-ring" />
                    TRANSMITTING...
                  </>
                ) : status === 'error' ? (
                  '⚠ TRANSMISSION FAILED — RETRY'
                ) : (
                  '▶ SEND MESSAGE'
                )}
              </button>

              {status === 'error' && (
                <p className="contact-error">
                  {EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
                    ? '// CONFIG REQUIRED: Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, and YOUR_PUBLIC_KEY in ContactForm.jsx with your real EmailJS credentials from emailjs.com'
                    : '// ERR: Transmission failed. Please email directly: dharanivasan.v2024csbs@sece.ac.in'
                  }
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
