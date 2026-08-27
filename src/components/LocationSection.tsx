import React from 'react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';
import { MapPin, Phone, MessageSquare, Navigation, Clock } from 'lucide-react';
import { openWhatsAppWithMessage } from '../utils/whatsappFormatter';

export const LocationSection: React.FC = () => {
  const handleWhatsApp = () => {
    openWhatsAppWithMessage(`Hello ${GOPAL_PRESS_CONFIG.brandName}, I would like to visit your press studio in Preetam Nagar, Prayagraj.`);
  };

  return (
    <section id="location" className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', margin: '0 auto var(--space-10) auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot cyan" />
            <span className="text-caption">STUDIO & PRODUCTION PRESS</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Visit Gopal Printing Press.
          </h2>

          <p className="text-body-large">
            Stop by our print studio in Prayagraj to touch physical paper samples, inspect velvet lamination options, or discuss bulk packaging orders in person.
          </p>
        </div>

        {/* Split Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          {/* Left Details */}
          <div style={{ gridColumn: 'span 12' }} className="loc-info-col">
            <div
              style={{
                backgroundColor: 'var(--paper)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <MapPin size={24} style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.25rem', marginBottom: 'var(--space-1)' }}>
                      Primary Press Location
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: 1.5, fontWeight: 500 }}>
                      {GOPAL_PRESS_CONFIG.location.addressLine1}, {GOPAL_PRESS_CONFIG.location.addressLine2},<br />
                      {GOPAL_PRESS_CONFIG.location.city}, {GOPAL_PRESS_CONFIG.location.state} - {GOPAL_PRESS_CONFIG.location.pincode}, India
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-5)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    <Clock size={14} /> WORKING HOURS
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-family)' }}>{GOPAL_PRESS_CONFIG.contact.workingHours}</div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    <Phone size={14} /> PHONE ENQUIRY
                  </div>
                  <a href={`tel:${GOPAL_PRESS_CONFIG.contact.phoneRaw}`} style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: 'var(--font-family)', color: 'var(--brand-primary)', textDecoration: 'none' }}>
                    {GOPAL_PRESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-5)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <a
                  href={GOPAL_PRESS_CONFIG.location.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, height: '48px', justifyContent: 'center' }}
                >
                  <Navigation size={18} /> Get Directions
                </a>

                <button onClick={handleWhatsApp} className="btn-whatsapp" style={{ flex: 1, height: '48px', justifyContent: 'center' }}>
                  <MessageSquare size={18} /> WhatsApp Location
                </button>
              </div>
            </div>
          </div>

          {/* Right Google Maps Embed Preview */}
          <div style={{ gridColumn: 'span 12' }} className="loc-map-col">
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-medium)',
                height: '380px',
                backgroundColor: 'var(--paper-subtle)',
              }}
            >
              <iframe
                title="Gopal Printing Press Location Map"
                src={GOPAL_PRESS_CONFIG.location.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .loc-info-col { grid-column: span 5 !important; }
          .loc-map-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
};
