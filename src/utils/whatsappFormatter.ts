import type { CartItem, Product, SelectedProductConfig } from '../types';
import { calculateItemPrice, formatCurrency } from './pricingEngine';
import { GOPAL_PRESS_CONFIG } from './config';

export function openWhatsAppWithMessage(message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${GOPAL_PRESS_CONFIG.contact.whatsappNumber}?text=${encoded}`;
  window.open(url, '_blank');
}

export function formatSingleProductWhatsAppMessage(product: Product, config: SelectedProductConfig): string {
  const price = calculateItemPrice(product, config);
  const material = product.config.materials.find((m) => m.id === config.materialId)?.name || 'Standard';
  const gsm = product.config.gsmOptions.find((g) => g.id === config.gsmId)?.name || 'Standard';
  const side = config.sideId === 'double' ? 'Double Side' : 'Single Side';
  const finish = product.config.finishes.find((f) => f.id === config.finishId)?.name || 'Standard';

  return `*PRINT ENQUIRY — ${GOPAL_PRESS_CONFIG.brandName}*
----------------------------------------
*Product:* ${product.name}
*Quantity:* ${config.quantity} units
*Paper Stock:* ${material}
*GSM Weight:* ${gsm}
*Print Side:* ${side}
*Finish / Lamination:* ${finish}
----------------------------------------
*Estimated Grand Total:* ${formatCurrency(price.grandTotal)} (Incl. 18% GST estimate)

Location: Preetam Nagar, Dhoomanganj, Prayagraj.
Please confirm turnaround timeline and sample availability.`;
}

export function formatCartWhatsAppMessage(cartItems: CartItem[]): string {
  if (cartItems.length === 0) return '';

  let text = `*NEW ORDER ENQUIRY — ${GOPAL_PRESS_CONFIG.brandName}*\n`;
  text += `Studio: Preetam Nagar, Dhoomanganj, Prayagraj\n`;
  text += `----------------------------------------\n\n`;

  let grandTotalSum = 0;

  cartItems.forEach((item, index) => {
    const { product, config, priceBreakdown } = item;
    const material = product.config.materials.find((m) => m.id === config.materialId)?.name || 'Standard';
    const gsm = product.config.gsmOptions.find((g) => g.id === config.gsmId)?.name || 'Standard';
    const side = config.sideId === 'double' ? 'Double Side' : 'Single Side';
    const finish = product.config.finishes.find((f) => f.id === config.finishId)?.name || 'Standard';

    grandTotalSum += priceBreakdown.grandTotal;

    text += `*Job #${index + 1}: ${product.name}*\n`;
    text += `• Quantity: ${config.quantity}\n`;
    text += `• Material: ${material}\n`;
    text += `• GSM: ${gsm}\n`;
    text += `• Sides: ${side}\n`;
    text += `• Finish: ${finish}\n`;
    text += `• Est. Item Total: ${formatCurrency(priceBreakdown.grandTotal)}\n\n`;
  });

  text += `----------------------------------------\n`;
  text += `*ESTIMATED ORDER TOTAL:* ${formatCurrency(grandTotalSum)} (Incl. GST)\n\n`;
  text += `Please review order details and advise on payment / production schedule.`;

  return text;
}
