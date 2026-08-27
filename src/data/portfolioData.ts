import type { ProductCategory } from '../types';

export interface PortfolioItem {
  id: string;
  title: string;
  category: ProductCategory;
  clientType: string;
  printTech: string;
  image: string;
  description: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Velvet Soft-Touch Business Cards',
    category: 'business-cards',
    clientType: 'Architecture Studio, Civil Lines',
    printTech: '350 GSM + Raised Spot UV',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    description: 'Precision black cards with gold foil accents and velvet tactile lamination for an architectural firm.',
  },
  {
    id: 'p2',
    title: 'Custom Printed Kraft Retail Bags',
    category: 'packaging',
    clientType: 'Clothing Boutique, Preetam Nagar',
    printTech: 'Offset Print + Cotton Rope Handle',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: '200 GSM natural brown Kraft paper bags with reinforced bottom die-cuts and custom brand logo.',
  },
  {
    id: 'p3',
    title: 'Promotional Product Packaging Boxes',
    category: 'packaging',
    clientType: 'Pharma & FMCG Manufacturer',
    printTech: '350 GSM Duplex + Matte Film',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=600&q=80',
    description: 'Custom mono-carton boxes with tuck-in flaps and moisture-proof matte lamination.',
  },
];
