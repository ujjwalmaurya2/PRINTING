export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  popularProducts: string[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'retail-boutiques',
    name: 'Retail Stores & Boutiques',
    iconName: 'ShoppingBag',
    description: 'Custom paper shopping bags, clothing price tags, barcode stickers, and promotional flyers.',
    popularProducts: ['Paper Bags', 'Hang Tags', 'Flyers'],
  },
  {
    id: 'restaurants-cafes',
    name: 'Restaurants, Cafes & Bakeries',
    iconName: 'Utensils',
    description: 'Laminated menu cards, takeaway paper bags, food packaging boxes, and table tent cards.',
    popularProducts: ['Menu Cards', 'Sweet Boxes', 'Table Tents'],
  },
  {
    id: 'education-coaching',
    name: 'Schools & Coaching Institutes',
    iconName: 'GraduationCap',
    description: 'High-volume admission pamphlets, prospectuses, exam answer booklets, and ID card lanyards.',
    popularProducts: ['Pamphlets', 'Prospectus', 'ID Lanyards'],
  },
];
