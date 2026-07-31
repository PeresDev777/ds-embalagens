"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

type SortOption = "relevancia" | "nome";

const SORT_LABELS: Record<SortOption, string> = {
  relevancia: "Relevância",
  nome: "Nome (A-Z)",
};

export function CategoryProductGrid({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sortBy === "nome") {
      return list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    }
    return list;
  }, [products, sortBy]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {products.length} {products.length === 1 ? "produto" : "produtos"}
        </p>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Ordenar por
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-slate-500">
          Nenhum produto encontrado nesta categoria ainda.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
