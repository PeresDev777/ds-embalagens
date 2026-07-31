"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Abrir carrinho"
      className="relative flex h-11 items-center gap-2 rounded-full px-2.5 text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
    >
      <ShoppingCart size={22} />
      <span className="hidden text-sm font-semibold sm:inline">Carrinho</span>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-amber-950">
          {itemCount}
        </span>
      )}
    </button>
  );
}
