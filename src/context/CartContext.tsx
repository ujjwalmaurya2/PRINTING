import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, SelectedProductConfig } from '../types';
import { calculateItemPrice } from '../utils/pricingEngine';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  selectedQuoteProduct: Product | null;
  openQuoteModalWithProduct: (product?: Product | null) => void;
  addToCart: (product: Product, config: SelectedProductConfig) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotalAmount: number;
  taxAmount: number;
  grandTotalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function generateItemHash(productId: string, config: SelectedProductConfig): string {
  return `${productId}_${config.quantity}_${config.materialId}_${config.gsmId}_${config.sideId}_${config.finishId}_${config.designId}`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gopal_press_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('gopal_press_cart', JSON.stringify(cartItems));
    } catch {
      // Storage unavailable
    }
  }, [cartItems]);

  const addToCart = (product: Product, config: SelectedProductConfig) => {
    const itemHash = generateItemHash(product.id, config);
    const existingIndex = cartItems.findIndex((item) => item.id === itemHash);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const existing = updated[existingIndex];
      const newQuantity = existing.config.quantity + config.quantity;
      const newConfig = { ...existing.config, quantity: newQuantity };
      const newPrice = calculateItemPrice(product, newConfig);

      updated[existingIndex] = {
        ...existing,
        config: newConfig,
        priceBreakdown: newPrice,
      };
      setCartItems(updated);
    } else {
      const priceBreakdown = calculateItemPrice(product, config);
      const newItem: CartItem = {
        id: itemHash,
        product,
        config,
        priceBreakdown,
      };
      setCartItems([...cartItems, newItem]);
    }

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartItemQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const updatedConfig = { ...item.config, quantity: newQuantity };
          const updatedPrice = calculateItemPrice(item.product, updatedConfig);
          return {
            ...item,
            config: updatedConfig,
            priceBreakdown: updatedPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openQuoteModalWithProduct = (product?: Product | null) => {
    setSelectedQuoteProduct(product || null);
    setIsQuoteModalOpen(true);
  };

  const totalItemsCount = cartItems.length;
  const subtotalAmount = cartItems.reduce((acc, item) => acc + item.priceBreakdown.subtotal, 0);
  const taxAmount = cartItems.reduce((acc, item) => acc + item.priceBreakdown.estimatedTax, 0);
  const grandTotalAmount = cartItems.reduce((acc, item) => acc + item.priceBreakdown.grandTotal, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        selectedQuoteProduct,
        openQuoteModalWithProduct,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        totalItemsCount,
        subtotalAmount,
        taxAmount,
        grandTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
