import React from 'react';
import { Award, Sliders, Layers, Store, Clock } from 'lucide-react';

export const WhyGopalPress: React.FC = () => {
  const reasons = [
    { title: 'Quality First', desc: 'Strict inspection, crisp Pantone/CMYK registration, and premium paper stock.', icon: Award },
    { title: 'Custom Solutions', desc: 'Custom box dielines, specialized foil colors, and tailored board sizes.', icon: Sliders },
    { title: 'Small or Bulk', desc: 'Flexible quantity options starting from 100 visiting cards to 50,000+ flyers.', icon: Layers },
    { title: 'One Printing Partner', desc: 'Stationery, packaging, banners, and merchandise under one roof.', icon: Store },
    { title: 'Reliable Service', desc: 'Clear communication, predictable timelines, and Prayagraj local support.', icon: Clock },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot key" />
            <span className="text-caption">THE GOPAL PRESS DIFFERENCE</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Why Print With Us?
          </h2>

          <p className="text-body-large">
            We combine high-end equipment, attentive customer service, and commercial efficiency to deliver print collateral you will be proud to hand out.
          </p>
        </div>

        {/* Reasons Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--cyan)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-2)' }}>
                  {r.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
