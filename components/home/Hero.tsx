import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const CHECKLIST = ["Preço baixo", "Pronta entrega", "Entrega rápida"];

export function Hero() {
  return (
    <section className="bg-white pt-4 sm:pt-6">
      <Container>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl sm:aspect-[1717/600]">
          <div className="relative aspect-[1717/916] w-full sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
            <Image
              src="/hero/hero-produtos1.jpg"
              alt="Linha de embalagens descartáveis DS Embalagens para delivery: potes, copos, sacola, marmitas e caixa de pizza"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-1 bg-brand-950 px-5 py-6 sm:absolute sm:inset-y-0 sm:left-0 sm:w-[46%] sm:bg-transparent sm:px-8 sm:py-0 lg:w-[42%] lg:px-12">
            <h1 className="font-extrabold uppercase leading-[0.95] tracking-tight text-white">
              <span className="block text-lg sm:text-xl">Tudo para o seu</span>
              <span className="block text-4xl sm:text-5xl xl:text-6xl">Delivery</span>
              <span className="block text-lg sm:text-xl">em um só lugar!</span>
            </h1>

            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-medium text-white sm:text-sm">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-white" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/categoria/embalagens-de-isopor"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-xs font-bold uppercase text-brand-800 shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <ShoppingCart size={15} />
                Compre agora
              </Link>
              <a
                href="https://wa.me/5551992341428"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-green-600 px-4 py-2.5 text-xs font-bold uppercase text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <WhatsAppIcon size={15} />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
