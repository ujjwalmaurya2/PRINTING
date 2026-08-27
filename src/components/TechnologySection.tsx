import React, { useState } from 'react';
import { TECHNOLOGIES_DATA } from '../data/technologiesData';
import { Zap, Layers, Maximize, Shirt, Scissors, Sparkles, Grid, Flame, Eye, EyeOff } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [showOnlyEnabled, setShowOnlyEnabled] = useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Layers': return Layers;
      case 'Maximize': return Maximize;
      case 'Shirt': return Shirt;
      case 'Scissors': return Scissors;
      case 'Sparkles': return Sparkles;
      case 'Grid': return Grid;
      case 'Flame': default: return Flame;
    }
  };

  const displayedTechs = showOnlyEnabled
    ? TECHNOLOGIES_DATA.filter((t) => t.enabled)
    : TECHNOLOGIES_DATA;

  return (
    <section id="technologies" className="section-padding" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot yellow" />
            <span className="text-caption">EQUIPMENT & CAPABILITIES</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Precision Behind Every Print.
          </h2>

          <p className="text-body-large" style={{ marginBottom: 'var(--space-5)' }}>
            Our production house utilizes dedicated offset presses, digital engines, and post-press finishing lines tailored to your job size and material requirements.
          </p>

          {/* Dev/Config Filter Toggle */}
          <button
            onClick={() => setShowOnlyEnabled(!showOnlyEnabled)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              height: '36px',
              padding: '0 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'var(--font-family)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            {showOnlyEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>{showOnlyEnabled ? 'Showing Verified Technologies (Config Driven)' : 'Showing All Technologies (Including Placeholders)'}</span>
          </button>
        </div>

        {/* Technologies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {displayedTechs.map((tech) => {
            const Icon = getIcon(tech.iconName);
            return (
              <div
                key={tech.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: tech.enabled ? '1px solid var(--border-light)' : '1px dashed var(--border-strong)',
                  opacity: tech.enabled ? 1 : 0.7,
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                {!tech.enabled && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#F3F4F6',
                      color: '#6B7280',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    DEV PLACEHOLDER
                  </span>
                )}

                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--paper)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-primary)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  <Icon size={24} />
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {tech.subtitle}
                </div>

                <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                  {tech.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-5)', flexGrow: 1 }}>
                  {tech.description}
                </p>

                {/* Best For Tags */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    RECOMMENDED FOR
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {tech.bestFor.map((item) => (
                      <span
                        key={item}
                        style={{
                          backgroundColor: 'var(--paper-subtle)',
                          color: 'var(--charcoal)',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
