import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { ProductCategory } from '../types';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'business-cards', label: 'Business Cards' },
    { id: 'packaging', label: 'Packaging & Bags' },
    { id: 'promotional', label: 'Promotional & Signage' },
    { id: 'apparel', label: 'Apparel & Uniforms' },
    { id: 'stationery', label: 'Stationery' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === (activeCategory as ProductCategory));

  return (
    <section id="portfolio" className="section-padding" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot magenta" />
            <span className="text-caption">PORTFOLIO & EXAMPLES</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Printed by Gopal Printing Press.
          </h2>

          <p className="text-body-large">
            A selection of actual print samples, custom packaging boxes, matte visiting cards, and promotional materials executed for clients across Prayagraj.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            justifyContent: 'center',
            marginBottom: 'var(--space-10)',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  height: '40px',
                  padding: '0 18px',
                  backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--bg-card)',
                  color: isActive ? '#FFF' : 'var(--charcoal)',
                  border: isActive ? '1px solid var(--brand-primary)' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Masonry Grid */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No projects found in this category.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: 'var(--paper-subtle)' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(18, 19, 22, 0.85)',
                      color: '#FFF',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {item.printTech}
                  </span>
                </div>

                <div style={{ padding: 'var(--space-6)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.clientType}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 'var(--space-2)', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
