import type { Product } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { getDisplayCategory } from "@/lib/categoryMerge";
import { slugify } from "@/lib/slugify";

const FALLBACK_ICON = "/products/placeholder.svg";

// Foto real do produto quando disponível; caso contrário, o ícone da
// categoria correspondente (e não um placeholder genérico qualquer).
export function getProductImage(product: Product): string {
  if (product.image) return product.image;
  const categorySlug = slugify(getDisplayCategory(product.category));
  return getCategoryBySlug(categorySlug)?.icon ?? FALLBACK_ICON;
}
