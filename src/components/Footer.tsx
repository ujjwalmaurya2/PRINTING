import React from 'react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--brand-primary)',
        color: '#FAF9F5',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'calc(var(--space-16) + 40px)', // Space for mobile sticky action bar
        borderTop: '1px solid var(--border-strong)',
        fontFamily: 'var(--font-family)',
      }}
    >
      <div className="container">
        {/* Top Brand Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 12' }} className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FFF',
                  color: 'var(--brand-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-family)',
                }}
              >
                G
              </div>
              <span style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.35rem', color: '#FFF' }}>
                {GOPAL_PRESS_CONFIG.brandName}
              </span>
            </div>

            <p style={{ fontSize: '0.925rem', color: '#A0A5B1', lineHeight: 1.6, marginBottom: 'var(--space-5)', maxWidth: '360px' }}>
              {GOPAL_PRESS_CONFIG.tagline} Your full-service commercial printing studio and online print ordering partner in Prayagraj.
            </p>

            <div className="cmyk-registration-bar" style={{ marginBottom: 'var(--space-4)' }}>
              <span className="cmyk-dot cyan" />
              <span className="cmyk-dot magenta" />
              <span className="cmyk-dot yellow" />
              <span className="cmyk-dot key" style={{ backgroundColor: '#FFF' }} />
              <span style={{ fontSize: '0.75rem', color: '#A0A5B1', fontWeight: 600, marginLeft: '6px' }}>
                OFFSET • DIGITAL • PACKAGING
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ gridColumn: 'span 6' }} className="footer-links-col">
            <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1rem', color: '#FFF', marginBottom: 'var(--space-4)' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '0.875rem' }}>
              <li><a href="#hero" style={{ color: '#A0A5B1', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#services" style={{ color: '#A0A5B1', textDecoration: 'none' }}>Services</a></li>
              <li><a href="#products" style={{ color: '#A0A5B1', textDecoration: 'none' }}>Product Catalogue</a></li>
              <li><a href="#custom-builder" style={{ color: '#A0A5B1', textDecoration: 'none' }}>Custom Print Builder</a></li>
              <li><a href="#portfolio" style={{ color: '#A0A5B1', textDecoration: 'none' }}>Our Work</a></li>
              <li><a href="#location" style={{ color: '#A0A5B1', textDecoration: 'none' }}>Location</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div style={{ gridColumn: 'span 6' }} className="footer-services-col">
            <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1rem', color: '#FFF', marginBottom: 'var(--space-4)' }}>
              Print Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '0.875rem', color: '#A0A5B1' }}>
              <li>Business & Visiting Cards</li>
              <li>Custom Printed Paper Bags</li>
              <li>Product Packaging Boxes</li>
              <li>Flyers & Catalogues</li>
              <li>Flex & Vinyl Banners</li>
              <li>T-Shirts & Apparel Print</li>
            </ul>
          </div>

          {/* Location & SEO info */}
          <div style={{ gridColumn: 'span 12' }} className="footer-contact-col">
            <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1rem', color: '#FFF', marginBottom: 'var(--space-4)' }}>
              Studio Address
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#A0A5B1', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
              {GOPAL_PRESS_CONFIG.location.addressLine1}, {GOPAL_PRESS_CONFIG.location.addressLine2}, {GOPAL_PRESS_CONFIG.location.city}, {GOPAL_PRESS_CONFIG.location.state} - {GOPAL_PRESS_CONFIG.location.pincode}
            </p>
            <div style={{ fontSize: '0.825rem', color: '#A0A5B1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Phone: <a href={`tel:${GOPAL_PRESS_CONFIG.contact.phoneRaw}`} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>{GOPAL_PRESS_CONFIG.contact.phoneDisplay}</a></div>
              <div>Email: <span style={{ color: '#FFF', fontWeight: 600 }}>{GOPAL_PRESS_CONFIG.contact.email}</span></div>
            </div>
          </div>
        </div>

        {/* Local Keywords Strip */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: 'var(--space-4) 0', marginBottom: 'var(--space-6)', fontSize: '0.775rem', color: '#808592', textAlign: 'center' }}>
          Printing Press in Prayagraj • Printing Services in Dhoomanganj • Custom Printing in Prayagraj • Digital Printing Prayagraj • Packaging Box Manufacturer Prayagraj
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', fontSize: '0.8125rem', color: '#808592' }}>
          <div>
            © {new Date().getFullYear()} {GOPAL_PRESS_CONFIG.brandName}. All rights reserved. Preetam Nagar, Prayagraj, UP, India.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              padding: '0 var(--space-3)',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-family)',
            }}
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .footer-brand-col { grid-column: span 4 !important; }
          .footer-links-col { grid-column: span 2 !important; }
          .footer-services-col { grid-column: span 3 !important; }
          .footer-contact-col { grid-column: span 3 !important; }
        }
      `}</style>
    </footer>
  );
};
