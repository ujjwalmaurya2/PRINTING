import React from 'react';
import { Phone, MessageSquare, Send, ShoppingBag } from 'lucide-react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';
import { useCart } from '../context/CartContext';
import { openWhatsAppWithMessage } from '../utils/whatsappFormatter';

export const MobileActionBar: React.FC = () => {
  const { totalItemsCount, setIsCartOpen, openQuoteModalWithProduct } = useCart();

  const handleCall = () => {
    window.location.href = `tel:${GOPAL_PRESS_CONFIG.contact.phoneRaw}`;
  };

  const handleWhatsApp = () => {
    openWhatsAppWithMessage(`Hello ${GOPAL_PRESS_CONFIG.brandName}, I would like to make an enquiry for printing.`);
  };

  return (
    <div
      className="mobile-action-bar-root"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 800,
        backgroundColor: '#121316',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '8px 12px',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        {/* Call */}
        <button
          onClick={handleCall}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFF',
            fontSize: '0.725rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer',
            padding: '6px 0',
          }}
        >
          <Phone size={18} style={{ color: 'var(--cyan)' }} />
          <span>Call</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFF',
            fontSize: '0.725rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer',
            padding: '6px 0',
          }}
        >
          <MessageSquare size={18} style={{ color: 'var(--whatsapp-green)' }} />
          <span>WhatsApp</span>
        </button>

        {/* Get Quote */}
        <button
          onClick={() => openQuoteModalWithProduct()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFF',
            fontSize: '0.725rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer',
            padding: '6px 0',
          }}
        >
          <Send size={18} style={{ color: 'var(--yellow)' }} />
          <span>Quote</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFF',
            fontSize: '0.725rem',
            fontWeight: 600,
            fontFamily: 'var(--font-family)',
            cursor: 'pointer',
            position: 'relative',
            padding: '6px 0',
          }}
        >
          <ShoppingBag size={18} style={{ color: 'var(--magenta)' }} />
          <span>Cart {totalItemsCount > 0 ? `(${totalItemsCount})` : ''}</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .mobile-action-bar-root { display: none !important; }
        }
      `}</style>
    </div>
  );
};
