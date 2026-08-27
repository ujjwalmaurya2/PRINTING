import type { Product, SelectedProductConfig, PriceBreakdown } from '../types';

export function calculateItemPrice(product: Product, config: SelectedProductConfig): PriceBreakdown {
  const quantityObj = product.config.quantities.find((q) => q.quantity === config.quantity) || {
    quantity: config.quantity,
    discountMultiplier: 1.0,
  };

  const materialObj = product.config.materials.find((m) => m.id === config.materialId) || { costAdder: 0 };
  const gsmObj = product.config.gsmOptions.find((g) => g.id === config.gsmId) || { costAdder: 0 };
  const sideObj = product.config.printSides.find((s) => s.id === config.sideId) || { multiplier: 1.0 };
  const finishObj = product.config.finishes.find((f) => f.id === config.finishId) || { costAdderPerUnit: 0 };
  const designObj = product.config.designOptions.find((d) => d.id === config.designId) || { flatFee: 0 };

  const rawUnitCost = (product.basePrice + materialObj.costAdder + gsmObj.costAdder) * sideObj.multiplier + finishObj.costAdderPerUnit;
  const discountedUnitCost = rawUnitCost * quantityObj.discountMultiplier;
  const itemsSubtotal = discountedUnitCost * config.quantity;
  const designFee = designObj.flatFee;

  const subtotal = itemsSubtotal + designFee;
  const estimatedTax = subtotal * 0.18; // 18% GST estimate
  const grandTotal = subtotal + estimatedTax;
  const unitPrice = grandTotal / config.quantity;

  return {
    baseUnitCost: product.basePrice,
    materialAdder: materialObj.costAdder,
    gsmAdder: gsmObj.costAdder,
    sideMultiplier: sideObj.multiplier,
    finishAdder: finishObj.costAdderPerUnit,
    discountedUnitCost: Math.round(discountedUnitCost * 100) / 100,
    itemsSubtotal: Math.round(itemsSubtotal),
    designFee,
    subtotal: Math.round(subtotal),
    estimatedTax: Math.round(estimatedTax),
    grandTotal: Math.round(grandTotal),
    unitPrice: Math.round(unitPrice * 100) / 100,
    isDemoEstimate: true,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
