import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryProductGrid } from "@/components/product/CategoryProductGrid";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Embalagens da categoria ${category.name} em Porto Alegre. Monte seu pedido e finalize pelo WhatsApp.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <Container className="py-8">
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: category.name }]} />
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        {category.name}
      </h1>
      <CategoryProductGrid products={products} />
    </Container>
  );
}
