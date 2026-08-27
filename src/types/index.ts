export type ProductCategory =
  | 'business-cards'
  | 'marketing'
  | 'packaging'
  | 'apparel'
  | 'large-format'
  | 'stationery'
  | 'custom'
  | 'promotional';

export interface QuantityOption {
  quantity: number;
  label: string;
  discountMultiplier: number;
}

export interface MaterialOption {
  id: string;
  name: string;
  costAdder: number;
}

export interface GSMOption {
  id: string;
  name: string;
  costAdder: number;
}

export interface FinishOption {
  id: string;
  name: string;
  costAdderPerUnit: number;
}

export interface PrintSideOption {
  id: 'single' | 'double';
  name: string;
  multiplier: number;
}

export interface DesignOption {
  id: 'customer_design' | 'need_design';
  name: string;
  flatFee: number;
}

export interface ProductConfigSchema {
  defaultQuantity: number;
  quantities: QuantityOption[];
  defaultMaterialId: string;
  materials: MaterialOption[];
  defaultGsmId: string;
  gsmOptions: GSMOption[];
  defaultSideId: 'single' | 'double';
  printSides: PrintSideOption[];
  defaultFinishId: string;
  finishes: FinishOption[];
  defaultDesignId: 'customer_design' | 'need_design';
  designOptions: DesignOption[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  shortDescription: string;
  fullDescription: string;
  basePrice: number;
  minQuantity: number;
  estimatedDays: string;
  image: string;
  featured?: boolean;
  isQuoteOnly?: boolean;
  config: ProductConfigSchema;
}

export interface SelectedProductConfig {
  quantity: number;
  materialId: string;
  gsmId: string;
  sideId: 'single' | 'double';
  finishId: string;
  designId: 'customer_design' | 'need_design';
  customNotes?: string;
}

export interface PriceBreakdown {
  baseUnitCost: number;
  materialAdder: number;
  gsmAdder: number;
  sideMultiplier: number;
  finishAdder: number;
  discountedUnitCost: number;
  itemsSubtotal: number;
  designFee: number;
  subtotal: number;
  estimatedTax: number;
  grandTotal: number;
  unitPrice: number;
  isDemoEstimate: true;
}

export interface CartItem {
  id: string;
  product: Product;
  config: SelectedProductConfig;
  priceBreakdown: PriceBreakdown;
}
