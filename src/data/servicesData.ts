export interface ServiceCategoryGroup {
  id: string;
  categoryTitle: string;
  tagline: string;
  iconName: string;
  description: string;
  items: {
    name: string;
    description: string;
    popularProductLinkId?: string;
  }[];
}

export const SERVICES_DATA: ServiceCategoryGroup[] = [
  {
    id: 'commercial-printing',
    categoryTitle: 'Commercial Printing',
    tagline: 'HIGH-VOLUME OFFSET & DIGITAL PRODUCTION',
    iconName: 'Briefcase',
    description: 'Complete office & corporate collaterals executed with precise color control and fast turnaround.',
    items: [
      { name: 'Visiting & Business Cards', description: 'Matte, Gloss, Velvet, Textured & Spot UV finishes.', popularProductLinkId: 'visiting-cards' },
      { name: 'Letterheads & Envelopes', description: '90-120 GSM Bond paper with company branding.', popularProductLinkId: 'visiting-cards' },
      { name: 'Corporate Brochures', description: 'Bi-fold, tri-fold & multi-page company profiles.', popularProductLinkId: 'flyers-pamphlets' },
      { name: 'Bill Books & Invoices', description: 'Carbonless NCR duplicate & triplicate books.', popularProductLinkId: 'visiting-cards' },
    ],
  },
  {
    id: 'custom-packaging',
    categoryTitle: 'Packaging & Bags',
    tagline: 'RETAIL & E-COMMERCE PACKAGING SOLUTIONS',
    iconName: 'Package',
    description: 'Custom paper bags and mono-carton packaging engineered for product protection and brand impact.',
    items: [
      { name: 'Custom Printed Paper Bags', description: 'Kraft & coated art bags with cotton rope handles.', popularProductLinkId: 'paper-bags' },
      { name: 'Mono-Carton Packaging Boxes', description: 'Duplex & SBS board boxes for pharma, cosmetics, and food.', popularProductLinkId: 'packaging-boxes' },
      { name: 'Rigid Gift Boxes', description: 'Luxury gift packaging with custom inserts.', popularProductLinkId: 'packaging-boxes' },
      { name: 'Product Labels & Roll Stickers', description: 'Die-cut vinyl, transparent & paper adhesive stickers.', popularProductLinkId: 'visiting-cards' },
    ],
  },
  {
    id: 'promotional-marketing',
    categoryTitle: 'Promotional Printing',
    tagline: 'EVENT & CAMPAIGN DISTRIBUTION MATERIALS',
    iconName: 'Megaphone',
    description: 'Eye-catching flyers, posters, and display signage to amplify your marketing campaigns.',
    items: [
      { name: 'Flyers & Pamphlets', description: 'A4, A5, and DL flyers on 130-170 GSM gloss paper.', popularProductLinkId: 'flyers-pamphlets' },
      { name: 'Standees & Roll-Up Banners', description: 'Aluminum retractable pull-up standees.', popularProductLinkId: 'flyers-pamphlets' },
      { name: 'Flex & Star Flex Banners', description: 'Heavy-duty outdoor event banners.', popularProductLinkId: 'flyers-pamphlets' },
      { name: 'Vinyl Signage & Wall Graphics', description: 'Self-adhesive vinyl prints with lamination.', popularProductLinkId: 'flyers-pamphlets' },
    ],
  },
  {
    id: 'apparel-merchandise',
    categoryTitle: 'Apparel & Uniforms',
    tagline: 'CUSTOM TEXTILE & BRANDED MERCHANDISE',
    iconName: 'Shirt',
    description: 'Direct-to-Film (DTF) and screen-printed custom t-shirts, caps, and workwear uniforms.',
    items: [
      { name: 'Custom Printed T-Shirts', description: '100% Cotton round-neck & polo tees.', popularProductLinkId: 'visiting-cards' },
      { name: 'Corporate Workwear & Aprons', description: 'Embroidered & heat-transferred brand logos.', popularProductLinkId: 'visiting-cards' },
      { name: 'Promotional Lanyards & Badges', description: 'Satin ribbon printed ID lanyards.', popularProductLinkId: 'visiting-cards' },
    ],
  },
];
