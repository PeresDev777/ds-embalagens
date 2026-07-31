import { BadgeCheck, Clock, Headset, Tag, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const HIGHLIGHTS = [
  { icon: Tag, label: "Preço baixo" },
  { icon: Truck, label: "Entrega no mesmo dia" },
  { icon: Headset, label: "Atendimento rápido" },
  { icon: BadgeCheck, label: "Qualidade garantida" },
];

export function TopBar() {
  return (
    <div className="hidden bg-brand-900 py-2 text-brand-100 md:block">
      <Container className="flex items-center justify-between text-xs font-medium">
        <ul className="flex items-center gap-5 uppercase tracking-wide">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon size={13} className="text-white" />
              {label}
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-1.5">
          <Clock size={13} className="text-white" />
          Segunda a Sábado: 08h às 22h&nbsp;&nbsp;|&nbsp;&nbsp;Domingo: 09h às 18h
        </p>
      </Container>
    </div>
  );
}
