import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function PromoSection() {
  return (
    <section className="py-6">
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <a
            href="https://dsembalagens.my.canva.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[1600/372] w-full overflow-hidden rounded-2xl transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Image
              src="/promo/promo-atacado.png"
              alt="Promoções: compre no atacado e economize, até 30% off"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </a>

          <a
            href="https://wa.me/5551992341428"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-[1600/372] w-full overflow-hidden rounded-2xl transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <Image
              src="/promo/promo-whatsapp-v2.png"
              alt="Não encontrou o que procura? Fale com a nossa equipe pelo WhatsApp"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
