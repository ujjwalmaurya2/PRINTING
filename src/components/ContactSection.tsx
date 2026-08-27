import React, { useState } from 'react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';
import { Phone, MessageSquare, Send, Mail, CheckCircle2 } from 'lucide-react';
import { openWhatsAppWithMessage } from '../utils/whatsappFormatter';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: 'Business Cards',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleWhatsAppClick = () => {
    openWhatsAppWithMessage(`Hello ${GOPAL_PRESS_CONFIG.brandName}, I would like to get a quote for printing in Prayagraj.`);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="container" id="quote-form">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot key" />
            <span className="text-caption">START YOUR ORDER</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Let’s Print Something Great.
          </h2>

          <p className="text-body-large">
            Get in touch directly with our team in Preetam Nagar, Dhoomanganj, Prayagraj for immediate assistance or custom price estimates.
          </p>
        </div>

        {/* Contact Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
        >
          {/* Left Quick Action Cards */}
          <div style={{ gridColumn: 'span 12' }} className="contact-touchpoints-col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#E0F2FE', color: '#0369A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={22} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>CALL OUR STUDIO</div>
                  <a href={`tel:${GOPAL_PRESS_CONFIG.contact.phoneRaw}`} style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--charcoal)', textDecoration: 'none' }}>
                    {GOPAL_PRESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  cursor: 'pointer',
                }}
                onClick={handleWhatsAppClick}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={22} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>INSTANT WHATSAPP</div>
                  <div style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--whatsapp-green)' }}>
                    Chat on WhatsApp →
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFE4E6', color: '#BE123C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>EMAIL ENQUIRY</div>
                  <div style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1rem', color: 'var(--charcoal)' }}>
                    {GOPAL_PRESS_CONFIG.contact.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Direct Form */}
          <div style={{ gridColumn: 'span 12' }} className="contact-form-col">
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--whatsapp-green)', marginBottom: 'var(--space-4)' }} />
                  <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Thank you, <strong>{formData.name}</strong>. Gopal Printing Press will contact you at <strong>{formData.phone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '2px' }}>
                    Send Direct Message
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: errors.name ? '1px solid #DC2626' : '1px solid var(--border-strong)',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={GOPAL_PRESS_CONFIG.contact.phoneDisplay}
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: errors.phone ? '1px solid #DC2626' : '1px solid var(--border-strong)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Requirement Category</label>
                    <select
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      style={{ width: '100%', height: '48px', padding: '0 var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)' }}
                    >
                      <option value="Business Cards">Visiting & Business Cards</option>
                      <option value="Packaging">Paper Bags & Product Boxes</option>
                      <option value="Flyers & Pamphlets">Flyers & Promotional Pamphlets</option>
                      <option value="Signage">Banners & Standees</option>
                      <option value="Apparel">T-Shirts & Uniforms</option>
                      <option value="General Enquiry">General Print Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Message or Specifications</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe paper preferences, sizes, quantities or turnaround timeline..."
                      style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontFamily: 'var(--font-family)' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px', justifyContent: 'center' }}>
                    <Send size={18} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .contact-touchpoints-col { grid-column: span 5 !important; }
          .contact-form-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
};
