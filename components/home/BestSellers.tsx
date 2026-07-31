import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";

const FEATURED_SLUGS = [
  "caixa-de-pizza-branca-30cm",
  "copo-plastico-descartavel-branco-300ml-c100",
  "fibraform-pote-30ml-branco-fibraform-c100",
  "caixa-sacola-branca-30x40cm-c1000",
  "caixinha-batata-frita-preta-c100---10x115x85cm-axlxc",
  "guardanapo-tv-14x14cm-c2000",
  "totalplast-marmita-750ml-com-tampa",
  "plazapel-canudo-biodegradavel-sache-c100",
];

export function BestSellers() {
  const featured = FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is (typeof products)[number] => p !== undefined
  );

  return (
    <section className="py-8">
      <Container>
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900">
          Mais vendidos
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
