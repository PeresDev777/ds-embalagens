import Link from "next/link";
import { Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/layout/SearchBar";
import { CartButton } from "@/components/cart/CartButton";
import { TopBar } from "@/components/layout/TopBar";

const WHATSAPP_DISPLAY = "(51) 99234-1428";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <TopBar />

      <div className="border-b border-slate-100 py-3 shadow-sm">
        <Container>
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
            <Link href="/" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/logo-redonda.jpeg"
                alt="DS Embalagens"
                className="h-11 w-11 rounded-full sm:h-12 sm:w-12"
              />
            </Link>

            <SearchBar />

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <a
                href="https://wa.me/5551992341428"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-brand-700 md:flex"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Phone size={16} />
                </span>
                {WHATSAPP_DISPLAY}
              </a>
              <CartButton />
            </div>
          </div>
        </Container>
      </div>

      <nav aria-label="Categorias" className="border-b border-slate-100 bg-slate-50/70">
        <Container>
          <ul className="flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <li key={category.slug} className="shrink-0">
                <Link
                  href={`/categoria/${category.slug}`}
                  className="block rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-100 hover:text-brand-800"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
