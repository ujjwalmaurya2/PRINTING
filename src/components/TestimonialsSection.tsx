import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--paper)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot magenta" />
            <span className="text-caption">CLIENT TESTIMONIALS</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            What Our Clients Say.
          </h2>

          <p className="text-body-large">
            Real feedback from local businesses, event organizers, and retail brands across Prayagraj.
          </p>
        </div>

        {/* Clean Placeholder Structure (No Fabricated Reviews) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {[1, 2].map((idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-strong)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Quote size={28} style={{ color: 'var(--cyan)', marginBottom: 'var(--space-4)', opacity: 0.8 }} />
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                  “Verified customer testimonial from Prayagraj client will be displayed here upon review submission.”
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--paper-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--text-light)',
                  }}
                >
                  C{idx}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--charcoal)', fontFamily: 'var(--font-family)' }}>Client Feedback Placeholder</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Prayagraj Business</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
