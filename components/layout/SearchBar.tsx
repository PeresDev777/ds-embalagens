"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { getProductImage } from "@/lib/productImage";
import { getCardDisplayName } from "@/lib/productName";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results =
    query.trim().length > 1
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 6)
      : [];

  return (
    <div ref={containerRef} className="relative w-full sm:max-w-xl">
      <div className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-brand-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="O que você procura?"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          aria-label="Buscar"
          className="flex shrink-0 items-center justify-center bg-brand-700 px-4 text-white transition-colors hover:bg-brand-800"
        >
          <Search size={18} />
        </button>
      </div>

      {isFocused && results.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
          {results.map((product) => (
            <li key={product.id}>
              <Link
                href={`/produto/${product.slug}`}
                onClick={() => setIsFocused(false)}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-brand-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getProductImage(product)}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-lg bg-brand-50 object-cover"
                />
                <span className="flex-1 text-sm font-medium text-slate-700">
                  {getCardDisplayName(product)}
                </span>
                <span className="text-xs font-medium text-slate-400">{product.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {isFocused && query.trim().length > 1 && results.length === 0 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 rounded-xl border border-slate-100 bg-white p-4 text-center text-sm text-slate-500 shadow-xl">
          Nenhum produto encontrado para &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
