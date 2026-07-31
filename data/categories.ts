import { products } from "./products";
import { slugify } from "@/lib/slugify";
import { getDisplayCategory } from "@/lib/categoryMerge";

export type Category = {
  slug: string;
  name: string;
  icon: string; // foto real da categoria em public/icones/categorias/{slug}.png
};

const uniqueCategoryNames = Array.from(
  new Set(products.map((p) => getDisplayCategory(p.category)))
);

export const categories: Category[] = uniqueCategoryNames
  .map((name) => {
    const slug = slugify(name);
    return { slug, name, icon: `/icones/categorias/${slug}.png` };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
