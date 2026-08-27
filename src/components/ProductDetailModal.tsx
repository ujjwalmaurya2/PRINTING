import React, { useState } from 'react';
import type { Product, SelectedProductConfig } from '../types';
import { calculateItemPrice, formatCurrency } from '../utils/pricingEngine';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, MessageSquare, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { openWhatsAppWithMessage, formatSingleProductWhatsAppMessage } from '../utils/whatsappFormatter';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const [config, setConfig] = useState<SelectedProductConfig>({
    quantity: product.config.defaultQuantity,
    materialId: product.config.defaultMaterialId,
    gsmId: product.config.defaultGsmId,
    sideId: product.config.defaultSideId,
    finishId: product.config.defaultFinishId,
    designId: product.config.defaultDesignId,
    customNotes: '',
  });

  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [fileError, setFileError] = useState<string>('');

  const priceBreakdown = calculateItemPrice(product, config);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'application/postscript'];
    const maxMb = 25;

    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.ai') && !file.name.endsWith('.eps')) {
      setFileError('Supported formats: PDF, PNG, JPG, JPEG, AI, EPS');
      return;
    }

    if (file.size > maxMb * 1024 * 1024) {
      setFileError(`File size exceeds ${maxMb}MB limit.`);
      return;
    }

    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    setAttachedFile({ name: file.name, size: sizeFormatted });
  };

  const handleAddToCart = () => {
    addToCart(product, config);
    onClose();
  };

  const handleWhatsAppEnquiry = () => {
    const msg = formatSingleProductWhatsAppMessage(product, config);
    openWhatsAppWithMessage(msg);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '840px', padding: '0' }}>
        {/* Header Bar */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-6)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--paper)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              PRODUCT CONFIGURATOR
            </span>
            <h2 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.35rem' }}>{product.name}</h2>
          </div>

          <button onClick={onClose} className="btn-icon" aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--space-6)' }}>
          {/* Left Column: Product Info & Image */}
          <div style={{ gridColumn: 'span 12' }} className="modal-left-col">
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '230px', marginBottom: 'var(--space-4)', backgroundColor: 'var(--paper-subtle)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
              {product.fullDescription}
            </p>

            <div style={{ backgroundColor: 'var(--paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', padding: 'var(--space-4)', fontSize: '0.825rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Turnaround & Delivery:</div>
              <div style={{ color: 'var(--text-muted)' }}>Est. Production: {product.estimatedDays} • Local pickup in Dhoomanganj, Prayagraj or courier dispatch.</div>
            </div>
          </div>

          {/* Right Column: Configuration Form */}
          <div style={{ gridColumn: 'span 12' }} className="modal-right-col">
            {/* Quantity */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Quantity:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {product.config.quantities.map((q) => (
                  <button
                    key={q.quantity}
                    onClick={() => setConfig({ ...config, quantity: q.quantity })}
                    style={{
                      height: '36px',
                      padding: '0 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: config.quantity === q.quantity ? '2px solid var(--brand-primary)' : '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-card)',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-family)',
                      fontWeight: config.quantity === q.quantity ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Paper / Material:</label>
              <select
                value={config.materialId}
                onChange={(e) => setConfig({ ...config, materialId: e.target.value })}
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
              >
                {product.config.materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GSM & Sides */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>GSM:</label>
                <select
                  value={config.gsmId}
                  onChange={(e) => setConfig({ ...config, gsmId: e.target.value })}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                >
                  {product.config.gsmOptions.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Print Side:</label>
                <select
                  value={config.sideId}
                  onChange={(e) => setConfig({ ...config, sideId: e.target.value as 'single' | 'double' })}
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
                >
                  {product.config.printSides.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Finish */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>Finish / Lamination:</label>
              <select
                value={config.finishId}
                onChange={(e) => setConfig({ ...config, finishId: e.target.value })}
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-strong)', fontSize: '0.85rem' }}
              >
                {product.config.finishes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Artwork File Upload Simulation */}
            <div style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                Attach Print Artwork (Optional):
              </label>
              <input type="file" id="modal-file" accept=".pdf,.png,.jpg,.jpeg,.ai,.eps" onChange={handleFileUpload} style={{ display: 'none' }} />
              <label
                htmlFor="modal-file"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                  height: '38px',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-family)',
                  cursor: 'pointer',
                }}
              >
                <Upload size={14} /> {attachedFile ? 'Change Artwork File' : 'Choose PDF / AI / PNG File'}
              </label>

              {attachedFile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 600, marginTop: '6px' }}>
                  <CheckCircle2 size={14} /> File attached for this enquiry: <strong>{attachedFile.name} ({attachedFile.size})</strong>
                </div>
              )}
              {fileError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.785rem', color: '#DC2626', marginTop: '6px' }}>
                  <AlertCircle size={14} /> {fileError}
                </div>
              )}
            </div>

            {/* Price Box */}
            <div style={{ backgroundColor: 'var(--paper)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', border: '1px solid var(--border-light)', marginBottom: 'var(--space-4)' }}>
              {product.isQuoteOnly ? (
                <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-family)' }}>Custom Quote Required</div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>ESTIMATED PRICE</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-family)', color: 'var(--brand-primary)' }}>
                      {formatCurrency(priceBreakdown.grandTotal)}
                    </div>
                  </div>
                  <span className="tag-demo">DEMO ESTIMATE</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {!product.isQuoteOnly && (
                <button onClick={handleAddToCart} className="btn-primary" style={{ flex: 1, height: '48px', justifyContent: 'center' }}>
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              )}

              <button onClick={handleWhatsAppEnquiry} className="btn-whatsapp" style={{ flex: 1, height: '48px', justifyContent: 'center' }}>
                <MessageSquare size={16} /> WhatsApp Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .modal-left-col { grid-column: span 5 !important; }
          .modal-right-col { grid-column: span 7 !important; }
        }
      `}</style>
    </div>
  );
};
