import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, MessageSquare, Send, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/pricingEngine';
import { openWhatsAppWithMessage, formatCartWhatsAppMessage } from '../utils/whatsappFormatter';
import { GOPAL_PRESS_CONFIG } from '../utils/config';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartItemQuantity,
    subtotalAmount,
    taxAmount,
    grandTotalAmount,
    openQuoteModalWithProduct,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const message = formatCartWhatsAppMessage(cartItems);
    openWhatsAppWithMessage(message);
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--paper)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--brand-primary)' }} />
            <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.15rem' }}>Your Print Cart</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--paper-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
              {cartItems.length} {cartItems.length === 1 ? 'Job' : 'Jobs'}
            </span>
          </div>

          <button onClick={() => setIsCartOpen(false)} className="btn-icon" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body Items */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {cartItems.length === 0 ? (
            <div style={{ textTransform: 'none', textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--paper-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-light)',
                  marginBottom: '1rem',
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Your print cart is empty.
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '280px', marginBottom: '1.5rem' }}>
                Browse our product discovery or custom builder to select quantities and finishes.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  document.querySelector('#what-to-print')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
                style={{ height: '44px', padding: '0 20px', fontSize: '0.85rem' }}
              >
                Explore Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const { product, config, priceBreakdown } = item;
              const material = product.config.materials.find((m) => m.id === config.materialId)?.name || 'Standard';
              const gsm = product.config.gsmOptions.find((g) => g.id === config.gsmId)?.name || 'Standard';
              const side = config.sideId === 'double' ? 'Double Side' : 'Single Side';
              const finish = product.config.finishes.find((f) => f.id === config.finishId)?.name || 'Standard';

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'var(--paper)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    padding: 'var(--space-4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '2px' }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                        {config.quantity} Qty • {material} • {gsm} • {side} • {finish}
                      </div>
                    </div>
                  </div>

                  {/* Item Pricing & Quantity Control */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '2px 6px' }}>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, config.quantity - 50)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '40px', textAlign: 'center', fontFamily: 'var(--font-family)' }}>
                        {config.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, config.quantity + 50)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-family)' }}>
                        {formatCurrency(priceBreakdown.grandTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: 'var(--space-5)',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: 'var(--paper)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated Subtotal:</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(subtotalAmount)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Estimated GST (18%):</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(taxAmount)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-family)', color: 'var(--brand-primary)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-2)' }}>
              <span>Grand Total:</span>
              <span>{formatCurrency(grandTotalAmount)}</span>
            </div>

            <div style={{ fontSize: '0.725rem', color: 'var(--text-light)', textAlign: 'center', marginBottom: '4px' }}>
              {GOPAL_PRESS_CONFIG.demoPricingDisclaimer}
            </div>

            <button onClick={handleWhatsAppCheckout} className="btn-whatsapp" style={{ width: '100%', height: '48px', justifyContent: 'center' }}>
              <MessageSquare size={18} /> Submit Order via WhatsApp
            </button>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openQuoteModalWithProduct();
                }}
                className="btn-secondary"
                style={{ flex: 1, height: '44px', fontSize: '0.8125rem', justifyContent: 'center' }}
              >
                <Send size={14} /> Custom Quote
              </button>
              <button
                onClick={clearCart}
                style={{ background: 'none', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: '0 12px', height: '44px', fontSize: '0.8125rem', color: '#6B7280', cursor: 'pointer', fontFamily: 'var(--font-family)' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
