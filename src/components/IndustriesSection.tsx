import React from 'react';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { Building2, ShoppingBag, Utensils, GraduationCap, Stethoscope, PartyPopper, Factory, Home, Truck, Store } from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'ShoppingBag': return ShoppingBag;
      case 'Utensils': return Utensils;
      case 'GraduationCap': return GraduationCap;
      case 'Stethoscope': return Stethoscope;
      case 'PartyPopper': return PartyPopper;
      case 'Factory': return Factory;
      case 'Home': return Home;
      case 'Truck': return Truck;
      case 'Store': default: return Store;
    }
  };

  return (
    <section id="industries" className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot yellow" />
            <span className="text-caption">TAILORED INDUSTRY SOLUTIONS</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Printing for Every Kind of Business.
          </h2>

          <p className="text-body-large">
            Whether you operate a restaurant in Civil Lines, a boutique store in Preetam Nagar, or a corporate firm in Prayagraj, we understand your unique print requirements.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = getIcon(ind.iconName);
            return (
              <div
                key={ind.id}
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.transform = 'translateY(0)';
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

                <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 'var(--space-2)' }}>
                  {ind.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-5)', flexGrow: 1 }}>
                  {ind.description}
                </p>

                {/* Popular Products */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    POPULAR PRINTS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {ind.popularProducts.map((p) => (
                      <span
                        key={p}
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {p}
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
