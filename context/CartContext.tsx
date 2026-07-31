"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";
import { cartStore, type CartItem } from "@/lib/cartStore";

export type CartLine = CartItem & {
  product: Product;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  isOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const current = cartStore.getSnapshot();
    const existing = current.find((item) => item.productId === productId);
    const next = existing
      ? current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...current, { productId, quantity }];
    cartStore.setItems(next);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    const current = cartStore.getSnapshot();
    cartStore.setItems(current.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const current = cartStore.getSnapshot();
    if (quantity <= 0) {
      cartStore.setItems(current.filter((item) => item.productId !== productId));
      return;
    }
    cartStore.setItems(
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => cartStore.setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((line): line is CartLine => line !== null);
  }, [items]);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    itemCount,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return ctx;
}
