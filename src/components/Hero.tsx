import React from 'react';
import { ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero: React.FC = () => {
  const { openQuoteModalWithProduct } = useCart();

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#what-to-print')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        paddingTop: 'clamp(3rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6.5rem)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Subtle CMYK Top Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--space-6)',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div className="cmyk-registration-bar">
            <span className="cmyk-dot cyan" title="Cyan" />
            <span className="cmyk-dot magenta" title="Magenta" />
            <span className="cmyk-dot yellow" title="Yellow" />
            <span className="cmyk-dot key" title="Key/Black" />
          </div>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '0.02em' }}>
            PREETAM NAGAR, PRAYAGRAJ • COMMERCIAL PRINT STUDIO
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Hero Text */}
          <div style={{ gridColumn: 'span 12' }} className="hero-text-col">
            <h1 className="text-hero" style={{ marginBottom: 'var(--space-5)', color: 'var(--charcoal)' }}>
              YOUR IDEAS. <br />
              <span style={{ color: 'var(--brand-primary)', position: 'relative' }}>
                OUR PRINT.
                <svg
                  width="180"
                  height="12"
                  viewBox="0 0 180 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    width: '55%',
                    height: 'auto',
                  }}
                >
                  <path d="M2 10C50 3 130 3 178 10" stroke="var(--cyan)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p
              className="text-body-large"
              style={{
                maxWidth: '640px',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                marginBottom: 'var(--space-8)',
                color: 'var(--text-muted)',
                lineHeight: 1.55,
              }}
            >
              From everyday business printing to custom packaging, promotional materials, and branded apparel —{' '}
              <strong style={{ color: 'var(--charcoal)', fontWeight: 600 }}>Gopal Printing Press</strong> brings your projects to life with precision quality in Prayagraj.
            </p>

            {/* CTAs with Equal Height Scale (52px) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', marginBottom: 'var(--space-10)' }}>
              <button
                onClick={() => openQuoteModalWithProduct()}
                className="btn-primary"
                style={{ height: '52px', padding: '0 28px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
              >
                Get a Quote <ArrowRight size={18} />
              </button>

              <a
                href="#what-to-print"
                onClick={handleExploreClick}
                className="btn-secondary"
                style={{ height: '52px', padding: '0 28px', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
              >
                Explore Printing Services
              </a>
            </div>

            {/* Small Trust Labels */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-5)',
                alignItems: 'center',
                paddingTop: 'var(--space-5)',
                borderTop: '1px solid var(--border-light)',
              }}
            >
              {[
                'Custom Printing',
                'Bulk & Small Orders',
                'Professional Finishing',
                'Prayagraj Studio',
              ].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--cyan)' }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Layer Composition */}
          <div style={{ gridColumn: 'span 12' }} className="hero-visual-col">
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-card)',
                padding: 'var(--space-6)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-medium)',
                overflow: 'hidden',
              }}
            >
              {/* Main Print Showcase Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: '#1E2026',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80"
                    alt="Luxury Matte Business Cards"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '14px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                      color: '#FFF',
                    }}
                  >
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--cyan)' }}>VISITING CARDS</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Velvet Matte + Spot UV</div>
                  </div>
                </div>

                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: '#F3F1EB',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
                    alt="Custom Kraft Paper Bags"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '14px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                      color: '#FFF',
                    }}
                  >
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--yellow)' }}>ECO PACKAGING</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Printed Kraft Bags</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Overlay Floating Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#FFF',
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  textAlign: 'center',
                  minWidth: '220px',
                }}
              >
                <div style={{ fontSize: '0.725rem', letterSpacing: '0.08em', color: 'var(--cyan)', fontWeight: 700 }}>
                  GOPAL PRINTING PRESS
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-family)' }}>
                  COMMERCIAL & DIGITAL
                </div>
                <div style={{ fontSize: '0.725rem', opacity: 0.8, marginTop: '2px' }}>Dhoomanganj, Prayagraj</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-12)' }}>
          <a
            href="#trust-bar"
            aria-label="Scroll down to details"
            style={{
              color: 'var(--text-light)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              gap: '4px',
            }}
          >
            <span>SCROLL TO DISCOVER</span>
            <ChevronDown size={18} style={{ animation: 'slideUp 1.5s infinite alternate' }} />
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-text-col { grid-column: span 7 !important; }
          .hero-visual-col { grid-column: span 5 !important; }
        }
      `}</style>
    </section>
  );
};
