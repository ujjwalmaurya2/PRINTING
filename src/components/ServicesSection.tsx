import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { Briefcase, Package, Megaphone, Shirt, Printer, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { PRODUCTS_DATA } from '../data/productsData';

interface ServicesSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return Briefcase;
      case 'Package': return Package;
      case 'Megaphone': return Megaphone;
      case 'Shirt': return Shirt;
      case 'Printer': default: return Printer;
    }
  };

  const selectedGroup = SERVICES_DATA.find((g) => g.id === activeTab) || SERVICES_DATA[0];

  const handleProductLink = (productId?: string) => {
    if (!productId) return;
    const found = PRODUCTS_DATA.find((p) => p.id === productId);
    if (found) {
      onSelectProduct(found);
    }
  };

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '680px', margin: '0 auto var(--space-12) auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot magenta" />
            <span className="text-caption">COMMERCIAL & CUSTOM CAPABILITIES</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>
            Everything You Need to Print.
          </h2>

          <p className="text-body-large">
            We organize our production capabilities into specialized divisions to handle standard business collaterals, custom retail packaging, and large-scale branding.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            justifyContent: 'center',
            marginBottom: 'var(--space-10)',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: 'var(--space-4)',
          }}
        >
          {SERVICES_DATA.map((cat) => {
            const Icon = getIcon(cat.iconName);
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '44px',
                  padding: '0 var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--paper)' : 'transparent',
                  color: isActive ? 'var(--charcoal)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--border-strong)' : '1px solid transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.925rem',
                  fontFamily: 'var(--font-family)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--cyan)' : 'inherit' }} />
                <span>{cat.categoryTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Group Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-8)',
            alignItems: 'start',
            backgroundColor: 'var(--paper)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Left Summary Box */}
          <div style={{ gridColumn: 'span 12' }} className="service-info-col">
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {selectedGroup.tagline}
            </div>

            <h3 style={{ fontFamily: 'var(--font-family)', fontSize: '1.75rem', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              {selectedGroup.categoryTitle}
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
              {selectedGroup.description}
            </p>

            <div style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px', color: 'var(--charcoal)', fontFamily: 'var(--font-family)' }}>
                Need Custom Dimensions or Materials?
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                Our team in Dhoomanganj, Prayagraj can prepare a personalized quotation for custom requirements.
              </div>
              <a
                href="#quote-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
                style={{ height: '40px', fontSize: '0.85rem', padding: '0 var(--space-4)' }}
              >
                Request Custom Quote <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Services List Grid */}
          <div style={{ gridColumn: 'span 12' }} className="service-list-col">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
              {selectedGroup.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    padding: 'var(--space-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '3px' }} />
                      <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1rem' }}>{item.name}</h4>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45, paddingLeft: '24px' }}>
                      {item.description}
                    </p>
                  </div>

                  {item.popularProductLinkId && (
                    <button
                      onClick={() => handleProductLink(item.popularProductLinkId)}
                      style={{
                        alignSelf: 'flex-start',
                        marginTop: 'var(--space-4)',
                        marginLeft: '24px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--brand-accent)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-family)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0,
                      }}
                    >
                      Configure Now →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .service-info-col { grid-column: span 4 !important; }
          .service-list-col { grid-column: span 8 !important; }
        }
      `}</style>
    </section>
  );
};
