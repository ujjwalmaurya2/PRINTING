import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/productsData';
import type { SelectedProductConfig } from '../types';
import { calculateItemPrice, formatCurrency } from '../utils/pricingEngine';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export const EcommercePricingSection: React.FC = () => {
  const { addToCart, openQuoteModalWithProduct } = useCart();
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.featured);
  const [activeProductId, setActiveProductId] = useState<string>(featuredProducts[0].id);

  const product = PRODUCTS_DATA.find((p) => p.id === activeProductId) || featuredProducts[0];

  const [config, setConfig] = useState<SelectedProductConfig>({
    quantity: product.config.defaultQuantity,
    materialId: product.config.defaultMaterialId,
    gsmId: product.config.defaultGsmId,
    sideId: product.config.defaultSideId,
    finishId: product.config.defaultFinishId,
    designId: product.config.defaultDesignId,
  });

  const handleProductSelect = (pId: string) => {
    setActiveProductId(pId);
    const selected = PRODUCTS_DATA.find((p) => p.id === pId) || featuredProducts[0];
    setConfig({
      quantity: selected.config.defaultQuantity,
      materialId: selected.config.defaultMaterialId,
      gsmId: selected.config.defaultGsmId,
      sideId: selected.config.defaultSideId,
      finishId: selected.config.defaultFinishId,
      designId: selected.config.defaultDesignId,
    });
  };

  const priceBreakdown = calculateItemPrice(product, config);

  return (
    <section id="online-ordering" className="section-padding" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '700px', margin: '0 auto var(--space-10) auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot cyan" />
            <span className="text-caption">ONLINE ESTIMATES & ORDERING</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Order Your Printing Online.
          </h2>

          <p className="text-body-large">
            Select a commercial print product below, configure quantity slabs and finishing choices, and instantly submit your order via WhatsApp or request a custom quotation.
          </p>
        </div>

        {/* Featured Product Selector Bar */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 'var(--space-3)',
            paddingBottom: 'var(--space-3)',
            marginBottom: 'var(--space-8)',
            scrollbarWidth: 'none',
          }}
        >
          {featuredProducts.map((fp) => {
            const isActive = fp.id === activeProductId;
            return (
              <button
                key={fp.id}
                onClick={() => handleProductSelect(fp.id)}
                style={{
                  whiteSpace: 'nowrap',
                  height: '44px',
                  padding: '0 var(--space-5)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--bg-card)',
                  color: isActive ? '#FFF' : 'var(--charcoal)',
                  border: isActive ? '1px solid var(--brand-primary)' : '1px solid var(--border-light)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-family)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--shadow-subtle)' : 'none',
                }}
              >
                {fp.name}
              </button>
            );
          })}
        </div>

        {/* Main Product Pricing Configurator Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-medium)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--space-8)',
              alignItems: 'center',
            }}
          >
            {/* Left Image & Specs */}
            <div style={{ gridColumn: 'span 12' }} className="ecom-image-col">
              <div
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--paper-subtle)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="tag-demo" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  INSTANT ESTIMATE
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>
                {product.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                {product.fullDescription}
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>• Min Quantity: <strong>{product.minQuantity}</strong></span>
                <span>• Turnaround: <strong>{product.estimatedDays}</strong></span>
              </div>
            </div>

            {/* Right Options Form */}
            <div style={{ gridColumn: 'span 12' }} className="ecom-options-col">
              {/* Quantities */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-family)' }}>
                  Select Quantity Slab:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {product.config.quantities.map((q) => {
                    const isSelected = config.quantity === q.quantity;
                    return (
                      <button
                        key={q.quantity}
                        onClick={() => setConfig({ ...config, quantity: q.quantity })}
                        style={{
                          height: '40px',
                          padding: '0 var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'var(--paper)' : 'var(--bg-card)',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-family)',
                          cursor: 'pointer',
                        }}
                      >
                        {q.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GSM & Sides */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-family)' }}>
                    Paper Weight (GSM):
                  </label>
                  <select
                    value={config.gsmId}
                    onChange={(e) => setConfig({ ...config, gsmId: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {product.config.gsmOptions.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-family)' }}>
                    Print Side:
                  </label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {product.config.printSides.map((s) => {
                      const isSelected = config.sideId === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setConfig({ ...config, sideId: s.id as 'single' | 'double' })}
                          style={{
                            flex: 1,
                            height: '48px',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                            fontSize: '0.8rem',
                            fontWeight: isSelected ? 700 : 500,
                            fontFamily: 'var(--font-family)',
                            cursor: 'pointer',
                          }}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Finishes */}
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-family)' }}>
                  Lamination / Finish:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {product.config.finishes.map((f) => {
                    const isSelected = config.finishId === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setConfig({ ...config, finishId: f.id })}
                        style={{
                          height: '40px',
                          padding: '0 var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                          backgroundColor: isSelected ? 'var(--paper)' : 'var(--bg-card)',
                          fontSize: '0.825rem',
                          fontWeight: isSelected ? 700 : 500,
                          fontFamily: 'var(--font-family)',
                          cursor: 'pointer',
                        }}
                      >
                        {f.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estimated Price Bar & Actions */}
              <div
                style={{
                  backgroundColor: 'var(--paper)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
                    ESTIMATED PRICE ({config.quantity} QTY)
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-family)', color: 'var(--brand-primary)' }}>
                    {formatCurrency(priceBreakdown.grandTotal)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Incl. GST ({formatCurrency(priceBreakdown.estimatedTax)})
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => addToCart(product, config)}
                    className="btn-primary"
                    style={{ height: '48px', padding: '0 var(--space-5)' }}
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => openQuoteModalWithProduct(product)}
                    className="btn-secondary"
                    style={{ height: '48px', padding: '0 var(--space-5)' }}
                  >
                    Custom Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .ecom-image-col { grid-column: span 5 !important; }
          .ecom-options-col { grid-column: span 7 !important; }
        }
      `}</style>
    </section>
  );
};
