import React from 'react';
import { Sliders, Layers, Sparkles, Briefcase, Zap } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const capabilities = [
    { title: 'Custom Printing', desc: 'Exact specs & custom dielines', icon: Sliders },
    { title: 'Bulk & Small Orders', desc: 'From 100 to 50,000+ units', icon: Layers },
    { title: 'Professional Finishing', desc: 'Matte, gloss, UV & foil', icon: Sparkles },
    { title: 'Business Printing', desc: 'Corporate collateral & packs', icon: Briefcase },
    { title: 'Fast Turnaround', desc: 'Same-day urgent digital runs', icon: Zap },
  ];

  return (
    <section
      id="trust-bar"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: 'var(--space-6) 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'center',
          }}
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--paper)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--charcoal)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.925rem', color: 'var(--charcoal)', lineHeight: 1.25 }}>
                    {cap.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{cap.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
