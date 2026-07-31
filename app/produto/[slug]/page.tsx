import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { slugify } from "@/lib/slugify";
import { getDisplayCategory } from "@/lib/categoryMerge";
import { extractDimensions } from "@/lib/productName";
import { getProductImage } from "@/lib/productImage";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const { displayName } = extractDimensions(product.name);
  return {
    title: displayName,
    description: `${product.name} — ${product.category}. Consulte disponibilidade e valores pelo WhatsApp.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(slugify(getDisplayCategory(product.category)));
  const related = getRelatedProducts(product);
  const { displayName, dimensions } = extractDimensions(product.name);

  const details = [
    product.brand && { label: "Marca", value: product.brand },
    product.sku && { label: "Código", value: product.sku },
    dimensions && { label: "Medidas", value: dimensions },
    product.minOrderQty && { label: "Pedido mínimo", value: `${product.minOrderQty} un.` },
    product.boxQty && { label: "Caixa com", value: `${product.boxQty} un.` },
  ].filter((d): d is { label: string; value: string } => Boolean(d));

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          ...(category ? [{ label: category.name, href: `/categoria/${category.slug}` }] : []),
          { label: displayName },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl bg-brand-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getProductImage(product)}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          {category && (
            <span className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-600">
              {category.name}
            </span>
          )}
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {displayName}
          </h1>

          {details.length > 0 && (
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {details.map((detail) => (
                <div key={detail.label} className="rounded-xl bg-slate-50 px-3 py-2">
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {detail.label}
                  </dt>
                  <dd className="text-sm font-semibold text-slate-800">{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Valores e condições de entrega são combinados diretamente pelo WhatsApp.
          </p>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <ProductDetailActions product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-extrabold tracking-tight text-slate-900">
            Produtos relacionados
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
