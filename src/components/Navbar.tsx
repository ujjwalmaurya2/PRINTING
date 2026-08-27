import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare, Menu, X } from 'lucide-react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';
import { useCart } from '../context/CartContext';
import { openWhatsAppWithMessage } from '../utils/whatsappFormatter';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen, openQuoteModalWithProduct } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Custom Builder', href: '#custom-builder' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Our Work', href: '#portfolio' },
    { name: 'Industries', href: '#industries' },
    { name: 'Location', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    openWhatsAppWithMessage(`Hello ${GOPAL_PRESS_CONFIG.brandName}, I would like to enquire about printing services in Prayagraj.`);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        height: '76px',
        backgroundColor: isScrolled ? 'rgba(250, 249, 245, 0.94)' : 'var(--paper)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand Logo - Fixed Dimensions */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--brand-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: 'var(--font-family)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            G
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--charcoal)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {GOPAL_PRESS_CONFIG.brandName}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              PRAYAGRAJ • PRINT STUDIO
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '28px' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                textDecoration: 'none',
                color: 'var(--charcoal)',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Action Right */}
        <div className="desktop-actions" style={{ display: 'none', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={handleWhatsAppClick}
            className="btn-icon"
            title="Chat on WhatsApp"
            style={{ color: 'var(--whatsapp-green)' }}
          >
            <MessageSquare size={20} />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-icon"
            title="View Cart"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={20} />
            {totalItemsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: 'var(--magenta)',
                  color: '#FFF',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => openQuoteModalWithProduct()}
            className="btn-primary"
            style={{ height: '44px', padding: '0 20px', fontSize: '0.875rem', fontWeight: 600, borderRadius: 'var(--radius-md)' }}
          >
            Get a Quote →
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="mobile-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-icon"
            aria-label="View Cart"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={22} />
            {totalItemsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  backgroundColor: 'var(--magenta)',
                  color: '#FFF',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-medium)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                textDecoration: 'none',
                color: 'var(--charcoal)',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {link.name}
            </a>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModalWithProduct();
              }}
              className="btn-primary"
              style={{ width: '100%', height: '48px' }}
            >
              Get a Quote →
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="btn-whatsapp"
              style={{ width: '100%', height: '48px' }}
            >
              <MessageSquare size={18} /> WhatsApp Quick Enquiry
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-actions { display: none !important; }
        }
      `}</style>
    </header>
  );
};
