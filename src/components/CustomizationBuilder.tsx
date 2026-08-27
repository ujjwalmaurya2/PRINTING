import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/productsData';
import type { SelectedProductConfig } from '../types';
import { calculateItemPrice, formatCurrency } from '../utils/pricingEngine';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Send, Check } from 'lucide-react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';

export const CustomizationBuilder: React.FC = () => {
  const { addToCart, openQuoteModalWithProduct } = useCart();
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS_DATA[0].id);

  const product = PRODUCTS_DATA.find((p) => p.id === selectedProductId) || PRODUCTS_DATA[0];

  const [config, setConfig] = useState<SelectedProductConfig>({
    quantity: product.config.defaultQuantity,
    materialId: product.config.defaultMaterialId,
    gsmId: product.config.defaultGsmId,
    sideId: product.config.defaultSideId,
    finishId: product.config.defaultFinishId,
    designId: product.config.defaultDesignId,
    customNotes: '',
  });

  const handleProductChange = (newProductId: string) => {
    setSelectedProductId(newProductId);
    const newProduct = PRODUCTS_DATA.find((p) => p.id === newProductId) || PRODUCTS_DATA[0];
    setConfig({
      quantity: newProduct.config.defaultQuantity,
      materialId: newProduct.config.defaultMaterialId,
      gsmId: newProduct.config.defaultGsmId,
      sideId: newProduct.config.defaultSideId,
      finishId: newProduct.config.defaultFinishId,
      designId: newProduct.config.defaultDesignId,
      customNotes: '',
    });
  };

  const estimate = calculateItemPrice(product, config);

  const selectedMaterial = product.config.materials.find((m) => m.id === config.materialId);
  const selectedGsm = product.config.gsmOptions.find((g) => g.id === config.gsmId);
  const selectedSide = product.config.printSides.find((s) => s.id === config.sideId);
  const selectedFinish = product.config.finishes.find((f) => f.id === config.finishId);
  const selectedDesign = product.config.designOptions.find((d) => d.id === config.designId);

  return (
    <section id="custom-builder" className="section-padding" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '680px', margin: '0 auto var(--space-10) auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
            <span className="cmyk-dot key" />
            <span className="text-caption">INTERACTIVE CONFIGURATOR</span>
          </div>

          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-3)' }}>
            Made Exactly For You.
          </h2>

          <p className="text-body-large">
            Customize paper weights, laminations, quantity slabs, and artwork requirements to see an instant estimate for your job.
          </p>
        </div>

        {/* Builder Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
        >
          {/* Left Config Controls Form */}
          <div
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'var(--paper)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
            className="builder-controls-col"
          >
            {/* Step 1: Select Product */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                1. Select Product Type
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => handleProductChange(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  backgroundColor: 'var(--bg-card)',
                  fontFamily: 'var(--font-family)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                  outline: 'none',
                }}
              >
                {PRODUCTS_DATA.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} {p.isQuoteOnly ? '(Quote Only)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Quantity Slabs */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                2. Select Quantity
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 'var(--space-2)' }}>
                {product.config.quantities.map((q) => {
                  const isSelected = config.quantity === q.quantity;
                  return (
                    <button
                      key={q.quantity}
                      type="button"
                      onClick={() => setConfig({ ...config, quantity: q.quantity })}
                      style={{
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                        backgroundColor: 'var(--bg-card)',
                        fontWeight: isSelected ? 700 : 500,
                        fontFamily: 'var(--font-family)',
                        fontSize: '0.875rem',
                        color: 'var(--charcoal)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>{q.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Material / Paper */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                3. Paper Stock / Material
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {product.config.materials.map((m) => {
                  const isSelected = config.materialId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setConfig({ ...config, materialId: m.id })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '48px',
                        padding: '0 var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                        backgroundColor: 'var(--bg-card)',
                        fontFamily: 'var(--font-family)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.9rem' }}>{m.name}</span>
                      {isSelected && <Check size={18} style={{ color: 'var(--cyan)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: GSM Weight & Print Sides */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                  4. Paper Weight (GSM)
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
                    backgroundColor: 'var(--bg-card)',
                    fontSize: '0.875rem',
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
                <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                  5. Print Sides
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {product.config.printSides.map((s) => {
                    const isSelected = config.sideId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setConfig({ ...config, sideId: s.id as 'single' | 'double' })}
                        style={{
                          flex: 1,
                          height: '48px',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                          backgroundColor: 'var(--bg-card)',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.85rem',
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

            {/* Step 5: Finish Lamination */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                6. Lamination & Surface Finish
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-2)' }}>
                {product.config.finishes.map((f) => {
                  const isSelected = config.finishId === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setConfig({ ...config, finishId: f.id })}
                      style={{
                        height: '44px',
                        padding: '0 var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                        backgroundColor: 'var(--bg-card)',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-family)',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {f.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Design Option */}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 'var(--space-2)' }}>
                7. Design & Artwork Service
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {product.config.designOptions.map((d) => {
                  const isSelected = config.designId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setConfig({ ...config, designId: d.id as 'customer_design' | 'need_design' })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '48px',
                        padding: '0 var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                        backgroundColor: 'var(--bg-card)',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-family)',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      <span>{d.name}</span>
                      {d.flatFee > 0 && <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 700 }}>+₹{d.flatFee}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary & Calculation Card */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'sticky',
              top: '90px',
            }}
            className="builder-summary-col"
          >
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-strong)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-medium)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                LIVE SPECIFICATION SUMMARY
              </div>

              <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.4rem', marginBottom: 'var(--space-4)' }}>
                {product.name}
              </h3>

              {/* Specs List */}
              <div style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: 'var(--space-4) 0', marginBottom: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Quantity:</span>
                  <span style={{ fontWeight: 700 }}>{config.quantity} Units</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Material:</span>
                  <span style={{ fontWeight: 600 }}>{selectedMaterial?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>GSM Weight:</span>
                  <span style={{ fontWeight: 600 }}>{selectedGsm?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Print Side:</span>
                  <span style={{ fontWeight: 600 }}>{selectedSide?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Finish:</span>
                  <span style={{ fontWeight: 600 }}>{selectedFinish?.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Artwork:</span>
                  <span style={{ fontWeight: 600 }}>{selectedDesign?.name}</span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div style={{ backgroundColor: 'var(--paper)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', marginBottom: 'var(--space-5)', border: '1px solid var(--border-light)' }}>
                {product.isQuoteOnly ? (
                  <div>
                    <span className="tag-quote-only" style={{ marginBottom: '8px' }}>Custom Quote Required</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-family)', color: 'var(--charcoal)' }}>
                      Contact for Volume Quote
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Large industrial jobs require custom dieline calculations.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>ESTIMATED TOTAL</span>
                      <span className="tag-demo">DEMO ESTIMATE</span>
                    </div>

                    <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-family)', color: 'var(--brand-primary)', lineHeight: 1.1 }}>
                      {formatCurrency(estimate.grandTotal)}
                    </div>

                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                      Incl. estimated 18% GST ({formatCurrency(estimate.estimatedTax)}) • Unit cost ~{formatCurrency(estimate.unitPrice)}
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {!product.isQuoteOnly && (
                  <button
                    onClick={() => addToCart(product, config)}
                    className="btn-primary"
                    style={{ width: '100%', height: '48px', justifyContent: 'center' }}
                  >
                    <ShoppingBag size={18} /> Add Configuration to Cart
                  </button>
                )}

                <button
                  onClick={() => openQuoteModalWithProduct(product)}
                  className="btn-secondary"
                  style={{ width: '100%', height: '48px', justifyContent: 'center' }}
                >
                  <Send size={18} /> Request Custom Quote
                </button>
              </div>

              <div style={{ fontSize: '0.725rem', color: 'var(--text-light)', textAlign: 'center', marginTop: 'var(--space-4)' }}>
                {GOPAL_PRESS_CONFIG.demoPricingDisclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .builder-controls-col { grid-column: span 7 !important; }
          .builder-summary-col { grid-column: span 5 !important; }
        }
      `}</style>
    </section>
  );
};
