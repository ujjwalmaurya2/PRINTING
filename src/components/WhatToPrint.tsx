import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/productsData';
import type { ProductCategory, Product } from '../types';
import { SlidersHorizontal, Tag } from 'lucide-react';
import { formatCurrency, calculateItemPrice } from '../utils/pricingEngine';

interface WhatToPrintProps {
  onSelectProduct: (product: Product) => void;
}

export const WhatToPrint: React.FC<WhatToPrintProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'business-cards', label: 'Visiting Cards' },
    { id: 'marketing', label: 'Flyers & Brochures' },
    { id: 'packaging', label: 'Bags & Boxes' },
    { id: 'apparel', label: 'T-Shirts & Uniforms' },
    { id: 'large-format', label: 'Banners & Flex' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'custom', label: 'Custom & Weddings' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === (activeCategory as ProductCategory));

  return (
    <section id="products" className="section-padding" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="container" id="what-to-print">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10) auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot cyan" />
            <span className="text-caption">PRODUCT CATALOGUE</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            What do you want to print?
          </h2>

          <p className="text-body-large">
            Choose a product below to configure quantities, paper GSM, finishes, and instantly estimate your pricing or request a custom quote.
          </p>
        </div>

        {/* Category Filter Pills */}
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
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(18, 19, 22, 0.12)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {filteredProducts.map((product) => {
            const defaultConfig = {
              quantity: product.config.defaultQuantity,
              materialId: product.config.defaultMaterialId,
              gsmId: product.config.defaultGsmId,
              sideId: product.config.defaultSideId,
              finishId: product.config.defaultFinishId,
              designId: product.config.defaultDesignId,
            };
            const sampleEstimate = calculateItemPrice(product, defaultConfig);

            return (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                  boxShadow: 'var(--shadow-subtle)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }}
              >
                {/* Product Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: 'var(--paper-subtle)' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  {product.isQuoteOnly ? (
                    <span className="tag-quote-only" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <Tag size={12} /> Custom Quote
                    </span>
                  ) : (
                    <span className="tag-demo" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      Estimate Available
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '4px' }}>
                    {product.tagline}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 'var(--space-2)', lineHeight: 1.25 }}>
                    {product.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-5)', flexGrow: 1, lineHeight: 1.5 }}>
                    {product.shortDescription}
                  </p>

                  {/* Pricing Footer inside Card */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>
                        {product.isQuoteOnly ? 'PRICING' : `EST. FROM (${defaultConfig.quantity} QTY)`}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--charcoal)', fontFamily: 'var(--font-family)' }}>
                        {product.isQuoteOnly ? 'Request Quote' : formatCurrency(sampleEstimate.grandTotal)}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="btn-secondary"
                      style={{ height: '38px', padding: '0 14px', fontSize: '0.8125rem', gap: '6px', borderRadius: 'var(--radius-sm)' }}
                    >
                      <SlidersHorizontal size={14} /> View Options
                    </button>
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
