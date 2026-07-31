import { Headset, PackageCheck, ShieldCheck, Tag, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const BENEFITS = [
  {
    icon: Truck,
    title: "Entrega rápida",
    description: "No mesmo dia para Porto Alegre e região",
  },
  {
    icon: Tag,
    title: "Preço baixo",
    description: "Os melhores preços da região",
  },
  {
    icon: PackageCheck,
    title: "Pronta entrega",
    description: "Itens em estoque para retirada rápida",
  },
  {
    icon: Headset,
    title: "Atendimento rápido",
    description: "Equipe especializada para te atender",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description: "Seus dados sempre protegidos",
  },
];

export function BenefitsBar() {
  return (
    <section className="bg-white py-4 sm:py-6">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-brand-900 sm:rounded-3xl">
          <ul className="grid grid-cols-1 gap-5 px-5 py-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 sm:px-8 sm:py-7 lg:flex lg:gap-0 lg:px-2 lg:py-6">
            {BENEFITS.map(({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                className={`flex items-center gap-3 sm:items-start lg:flex-1 lg:px-6 ${
                  index > 0 ? "lg:border-l lg:border-white/20" : ""
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-brand-200">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
