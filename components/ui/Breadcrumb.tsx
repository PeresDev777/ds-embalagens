import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={14} className="text-slate-300" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="text-slate-500 transition-colors hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-slate-800" : "text-slate-500"}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
