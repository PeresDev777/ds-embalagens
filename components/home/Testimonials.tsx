import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

// TODO: substituir pelos depoimentos reais de clientes quando disponíveis
const TESTIMONIALS = [
  {
    name: "Carlos M.",
    quote: "Atendimento excelente e entrega sempre no prazo. Produtos de ótima qualidade!",
  },
  {
    name: "Mariana S.",
    quote: "Encontro tudo que preciso para o meu delivery. Preços imbatíveis.",
  },
  {
    name: "Lucas A.",
    quote: "Melhor loja de embalagens de Porto Alegre. Recomendo demais.",
  },
];

export function Testimonials() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900">
          O que nossos clientes dizem
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <div className="mb-3 flex gap-0.5 text-accent-600">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-slate-600">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                — {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
