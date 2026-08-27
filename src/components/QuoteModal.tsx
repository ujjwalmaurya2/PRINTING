import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Send, Upload, CheckCircle } from 'lucide-react';
import { GOPAL_PRESS_CONFIG } from '../utils/config';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, selectedQuoteProduct } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    productType: selectedQuoteProduct ? selectedQuoteProduct.name : 'Business Cards',
    quantity: '500',
    size: '',
    material: '',
    deadline: 'Standard (3-4 Days)',
    message: '',
  });

  const [fileAttached, setFileAttached] = useState<{ name: string; size: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.productType) errs.productType = 'Select a product category';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'application/postscript'];
    if (!allowed.includes(file.type) && !file.name.endsWith('.ai') && !file.name.endsWith('.eps')) {
      alert('Invalid file format. Please upload PDF, PNG, JPG, AI or EPS.');
      return;
    }

    const mb = (file.size / (1024 * 1024)).toFixed(2);
    setFileAttached({ name: file.name, size: `${mb} MB` });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSubmitted(false);
    setFileAttached(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '0' }}>
        {/* Header */}
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
              PERSONALIZED QUOTATION
            </span>
            <h3 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.3rem' }}>Request a Custom Quote</h3>
          </div>

          <button onClick={handleClose} className="btn-icon" aria-label="Close quote modal">
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-6)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#DEF7EC',
                  color: '#03543F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-5) auto',
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-family)', fontWeight: 800, fontSize: '1.4rem', marginBottom: 'var(--space-2)' }}>
                Quotation Request Received!
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-6)', maxWidth: '440px', margin: '0 auto var(--space-6) auto' }}>
                Thank you, <strong>{formData.name}</strong>. Our estimate team at Gopal Printing Press in Dhoomanganj, Prayagraj will review your requirements and reach out via phone/WhatsApp shortly.
              </p>
              {fileAttached && (
                <div style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontWeight: 600, marginBottom: 'var(--space-6)', backgroundColor: 'var(--paper)', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)' }}>
                  Attached Artwork Reference: {fileAttached.name} ({fileAttached.size})
                </div>
              )}
              <button onClick={handleClose} className="btn-primary" style={{ width: '100%', height: '48px', justifyContent: 'center' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Tell us about your project specifications below for custom shapes, materials, or bulk commercial jobs.
              </div>

              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: errors.name ? '1px solid #DC2626' : '1px solid var(--border-strong)',
                    }}
                  />
                  {errors.name && <span style={{ fontSize: '0.725rem', color: '#DC2626' }}>{errors.name}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={GOPAL_PRESS_CONFIG.contact.phoneDisplay}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: errors.phone ? '1px solid #DC2626' : '1px solid var(--border-strong)',
                    }}
                  />
                  {errors.phone && <span style={{ fontSize: '0.725rem', color: '#DC2626' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Email & Product */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: errors.email ? '1px solid #DC2626' : '1px solid var(--border-strong)',
                    }}
                  />
                  {errors.email && <span style={{ fontSize: '0.725rem', color: '#DC2626' }}>{errors.email}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                    Product Category *
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                    }}
                  >
                    <option value="Business Cards">Business & Visiting Cards</option>
                    <option value="Packaging Boxes">Custom Packaging Boxes</option>
                    <option value="Paper Bags">Printed Paper Bags</option>
                    <option value="Flyers & Pamphlets">Flyers & Pamphlets</option>
                    <option value="Brochures">Brochures & Catalogues</option>
                    <option value="Labels & Stickers">Labels & Roll Stickers</option>
                    <option value="Banners & Flex">Flex & Vinyl Signage</option>
                    <option value="T-Shirts & Apparel">Apparel & Uniforms</option>
                    <option value="Wedding Invitations">Wedding & Event Cards</option>
                    <option value="Custom Printing">Other Custom Printing</option>
                  </select>
                </div>
              </div>

              {/* Quantity & Deadline */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 1000"
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                    Target Deadline
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                    }}
                  >
                    <option value="Urgent (1-2 Days)">Urgent (1-2 Days)</option>
                    <option value="Standard (3-4 Days)">Standard (3-4 Days)</option>
                    <option value="Bulk Production (5-7 Days)">Bulk Production (5-7 Days)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                  Specific Dimensions, Materials or Finishing Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention custom box sizes, foil stamping colors, paper texture preferences..."
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-strong)',
                    fontFamily: 'var(--font-family)',
                  }}
                />
              </div>

              {/* Design Upload Simulation */}
              <div style={{ backgroundColor: 'var(--paper)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', padding: 'var(--space-4)' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.825rem', marginBottom: '4px', fontFamily: 'var(--font-family)' }}>
                  Upload Reference Design or Dieline (Optional)
                </label>
                <input type="file" id="quote-modal-file" accept=".pdf,.png,.jpg,.jpeg,.ai,.eps" onChange={handleFileUpload} style={{ display: 'none' }} />
                <label
                  htmlFor="quote-modal-file"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-strong)',
                    height: '40px',
                    padding: '0 14px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-family)',
                    cursor: 'pointer',
                  }}
                >
                  <Upload size={14} /> {fileAttached ? 'Change File' : 'Attach PDF / AI / Image File'}
                </label>

                {fileAttached && (
                  <div style={{ fontSize: '0.785rem', color: 'var(--cyan)', fontWeight: 600, marginTop: '6px' }}>
                    Attached for enquiry: {fileAttached.name} ({fileAttached.size})
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', height: '48px', justifyContent: 'center', marginTop: '4px' }}>
                <Send size={18} /> Request Official Quote
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
