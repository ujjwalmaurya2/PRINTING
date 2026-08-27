import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import type { Product } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { WhatToPrint } from './components/WhatToPrint';
import { ServicesSection } from './components/ServicesSection';
import { TechnologySection } from './components/TechnologySection';
import { CustomizationBuilder } from './components/CustomizationBuilder';
import { EcommercePricingSection } from './components/EcommercePricingSection';
import { PortfolioSection } from './components/PortfolioSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { WhyGopalPress } from './components/WhyGopalPress';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { QuoteModal } from './components/QuoteModal';
import { GOPAL_PRESS_CONFIG } from './utils/config';

const AppContent: React.FC = () => {
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: GOPAL_PRESS_CONFIG.brandName,
    description: 'Commercial printing press, custom packaging box manufacturer, and digital print studio in Prayagraj.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${GOPAL_PRESS_CONFIG.location.addressLine1}, ${GOPAL_PRESS_CONFIG.location.addressLine2}`,
      addressLocality: GOPAL_PRESS_CONFIG.location.city,
      addressRegion: GOPAL_PRESS_CONFIG.location.state,
      postalCode: GOPAL_PRESS_CONFIG.location.pincode,
      addressCountry: GOPAL_PRESS_CONFIG.location.country,
    },
    telephone: GOPAL_PRESS_CONFIG.contact.phoneRaw,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    hasMap: GOPAL_PRESS_CONFIG.location.googleMapsDirectionsUrl,
    priceRange: '₹₹',
  };

  return (
    <div className="app-root">
      {/* Inject LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* 1. Sticky Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main>
        {/* 2. Premium Hero */}
        <Hero />

        {/* 3. Capability / Trust Bar */}
        <TrustBar />

        {/* 4. "What Do You Want to Print?" */}
        <WhatToPrint onSelectProduct={(product) => setActiveProductModal(product)} />

        {/* 5. Main Services */}
        <ServicesSection onSelectProduct={(product) => setActiveProductModal(product)} />

        {/* 6. Printing Technology */}
        <TechnologySection />

        {/* 7. Custom Printing Builder */}
        <CustomizationBuilder />

        {/* 8. Online Printing / E-commerce */}
        <EcommercePricingSection />

        {/* 9. Portfolio / Our Work */}
        <PortfolioSection />

        {/* 10. Industries */}
        <IndustriesSection />

        {/* 11. Printing Process */}
        <ProcessTimeline />

        {/* 12. Why Gopal Printing Press */}
        <WhyGopalPress />

        {/* 13. Testimonials */}
        <TestimonialsSection />

        {/* 14. Location / Google Maps */}
        <LocationSection />

        {/* 15. Contact Form */}
        <ContactSection />
      </main>

      {/* 16. Premium Footer */}
      <Footer />

      {/* 17. Mobile Sticky Action Bar */}
      <MobileActionBar />

      {/* Interactive Overlays */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />
      <CartDrawer />
      <QuoteModal />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
