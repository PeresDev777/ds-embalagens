"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/productImage";
import { getDisplayName } from "@/lib/productName";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

// Produtos com foto própria e exclusiva, onde a medida no título é
// redundante (a estampa já diferencia os cards) — mantém medida completa
// só na página de produto.
const HIDE_DIMENSIONS_IDS = new Set(["p079", "p080", "p081", "p082"]);

export function ProductCard({ product }: { product: Product }) {
  const { lines, addItem, updateQuantity } = useCart();
  const line = lines.find((l) => l.productId === product.id);
  const quantity = line?.quantity ?? 0;
  const displayName = HIDE_DIMENSIONS_IDS.has(product.id)
    ? getDisplayName(product.name)
    : product.name;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-md hover:shadow-slate-200/60">
      <Link
        href={`/produto/${product.slug}`}
        className="block aspect-square overflow-hidden bg-brand-50"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getProductImage(product)}
          alt={displayName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <Link href={`/produto/${product.slug}`} className="flex-1">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-slate-700 transition-colors hover:text-brand-700">
            {displayName}
          </h3>
        </Link>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="mt-1 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
          >
            <Plus size={16} />
            Adicionar
          </button>
        ) : (
          <div className="mt-1 flex w-full items-center justify-center">
            <QuantityStepper
              editable
              quantity={quantity}
              onDecrease={() => updateQuantity(product.id, quantity - 1)}
              onIncrease={() => updateQuantity(product.id, quantity + 1)}
              onChange={(value) => updateQuantity(product.id, value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
