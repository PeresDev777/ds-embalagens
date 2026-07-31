"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function ProductDetailActions({ product }: { product: Product }) {
  const { lines, addItem, updateQuantity } = useCart();
  const line = lines.find((l) => l.productId === product.id);
  const [quantity, setQuantity] = useState(1);

  if (line) {
    return (
      <div className="flex items-center gap-4">
        <QuantityStepper
          editable
          quantity={line.quantity}
          onDecrease={() => updateQuantity(product.id, line.quantity - 1)}
          onIncrease={() => updateQuantity(product.id, line.quantity + 1)}
          onChange={(value) => updateQuantity(product.id, value)}
        />
        <span className="text-sm font-medium text-green-700">
          {line.quantity} {line.quantity === 1 ? "unidade" : "unidades"} no carrinho
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantityStepper
        editable
        quantity={quantity}
        onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
        onIncrease={() => setQuantity((q) => q + 1)}
        onChange={(value) => setQuantity(Math.max(1, value))}
      />
      <button
        type="button"
        onClick={() => addItem(product.id, quantity)}
        className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
      >
        <ShoppingCart size={18} />
        Adicionar ao carrinho
      </button>
    </div>
  );
}
