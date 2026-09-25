import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Product, PurchaseMode } from '../types';
import { PRODUCTS } from '../data/products';

export interface CartItemState {
  product: Product;
  quantity: number;
  purchaseMode: PurchaseMode;
  selected?: boolean;
}

interface CartContextType {
  cartItems: CartItemState[];
  totalCartCount: number;
  cartTotalPriceVND: number;
  addToCart: (product: Product, quantity: number, purchaseMode: PurchaseMode) => void;
  updateQuantity: (productId: string, purchaseMode: PurchaseMode, quantity: number) => void;
  removeFromCart: (productId: string, purchaseMode: PurchaseMode) => void;
  toggleSelectItem: (productId: string, purchaseMode: PurchaseMode) => void;
  toggleSelectAll: () => void;
  clearCart: () => void;
  resetToZero: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'chutchiu_cart';
const CART_V150_RESET_KEY = 'chutchiu_cart_v150_reset';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemState[]>(() => {
    try {
      // V150 MANDATE: Strictly reset to 0 (Empty) for clean user session
      const hasResetV150 = localStorage.getItem(CART_V150_RESET_KEY);
      if (!hasResetV150) {
        localStorage.setItem(CART_V150_RESET_KEY, 'true');
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }

      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const rehydrated = parsed
            .map((item: any) => {
              const productId = item?.product?.id || item?.productId;
              // Discard any legacy default sample item
              if (productId === 'vua-mia-tuyet-350ml' && parsed.length === 1 && Number(item.quantity) === 1) {
                return null;
              }
              const product = PRODUCTS.find((p) => p.id === productId);
              if (!product) return null;
              return {
                product,
                quantity: Math.max(1, Number(item.quantity) || 1),
                purchaseMode: (item.purchaseMode === 'wholesale' ? 'wholesale' : 'retail') as PurchaseMode,
                selected: item.selected !== false,
              };
            })
            .filter(Boolean) as CartItemState[];
          return rehydrated;
        }
      }
    } catch (e) {
      console.error('Error hydrating cart from localStorage:', e);
    }
    // Default initial state is strictly 0 (Empty)
    return [];
  });

  useEffect(() => {
    try {
      if (cartItems.length === 0) {
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        const cleanData = cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          purchaseMode: item.purchaseMode,
          selected: item.selected !== false,
        }));
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cleanData));
      }
    } catch (e) {
      console.warn('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotalPriceVND = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.selected === false) return acc;
      const unitPrice =
        item.purchaseMode === 'wholesale'
          ? (item.product.prices?.wholesale1 || item.product.prices?.retail || 0)
          : (item.product.prices?.retail || 0);
      return acc + unitPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, purchaseMode: PurchaseMode) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (it) => it.product.id === product.id && it.purchaseMode === purchaseMode
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity,
          selected: true,
        };
        return next;
      }
      return [...prev, { product, quantity, purchaseMode, selected: true }];
    });
  };

  const updateQuantity = (productId: string, purchaseMode: PurchaseMode, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter(
          (it) => !(it.product.id === productId && it.purchaseMode === purchaseMode)
        );
      }
      return prev.map((it) =>
        it.product.id === productId && it.purchaseMode === purchaseMode
          ? { ...it, quantity }
          : it
      );
    });
  };

  const removeFromCart = (productId: string, purchaseMode: PurchaseMode) => {
    setCartItems((prev) =>
      prev.filter((it) => !(it.product.id === productId && it.purchaseMode === purchaseMode))
    );
  };

  const toggleSelectItem = (productId: string, purchaseMode: PurchaseMode) => {
    setCartItems((prev) =>
      prev.map((it) =>
        it.product.id === productId && it.purchaseMode === purchaseMode
          ? { ...it, selected: !it.selected }
          : it
      )
    );
  };

  const toggleSelectAll = () => {
    setCartItems((prev) => {
      const allSelected = prev.every((it) => it.selected !== false);
      return prev.map((it) => ({ ...it, selected: !allSelected }));
    });
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {}
  };

  const resetToZero = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.setItem(CART_V150_RESET_KEY, 'true');
    } catch {}
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartCount,
        cartTotalPriceVND,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleSelectItem,
        toggleSelectAll,
        clearCart,
        resetToZero,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
