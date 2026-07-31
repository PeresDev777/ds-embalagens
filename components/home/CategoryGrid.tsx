import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";

export function CategoryGrid() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900">
          Compre por categoria
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categoria/${category.slug}`}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-brand-50">
                <Image
                  src={category.icon}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1280px) 145px, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
