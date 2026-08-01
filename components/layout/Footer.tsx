import { Clock, Mail, MapPin, Package, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

const POLICY_LINKS = [
  "Sobre nós",
  "Política de entrega",
  "Trocas e devoluções",
  "Política de privacidade",
  "Fale conosco",
];

const PAYMENT_METHODS = [
  { name: "Visa", file: "/payment/payment-visa.svg" },
  { name: "Mastercard", file: "/payment/payment-mastercard.svg" },
  { name: "Elo", file: "/payment/payment-elo.svg" },
  { name: "Hipercard", file: "/payment/payment-hipercard.svg" },
  { name: "American Express", file: "/payment/payment-americanexpress.svg" },
  { name: "Pix", file: "/payment/payment-pix.webp" },
  { name: "Boleto", file: "/payment/payment-boleto.png" },
  { name: "Mercado Pago", file: "/payment/payment-mercadopago.svg" },
];

const COLUMNS = [
  {
    key: "logo",
    content: (
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo-redonda.jpeg"
          alt="DS Embalagens"
          className="h-20 w-20 shrink-0 rounded-full"
        />
        <p className="text-xs leading-relaxed text-brand-200">
          Tudo em embalagens descartáveis para o seu negócio com preço baixo, qualidade e
          atendimento rápido!
        </p>
      </div>
    ),
  },
  {
    key: "informacoes",
    content: (
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-white">Informações</h3>
        <ul className="space-y-1.5 text-xs text-brand-200">
          {POLICY_LINKS.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    key: "atendimento",
    content: (
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-white">Atendimento</h3>
        <ul className="space-y-1.5 text-xs text-brand-200">
          <li className="flex items-center gap-2">
            <Phone size={14} className="shrink-0 text-brand-300" />
            (51) 99234-1428
          </li>
          <li className="flex items-center gap-2">
            <Mail size={14} className="shrink-0 text-brand-300" />
            compras.dsembalagens@gmail.com
          </li>
          <li className="flex items-start gap-2">
            <Clock size={14} className="mt-0.5 shrink-0 text-brand-300" />
            <span>
              Segunda a Sábado: 08h às 22h
              <br />
              Domingo: 09h às 18h
            </span>
          </li>
          <li>
            <a
              href="https://www.instagram.com/dsembalagenspoa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-200"
            >
              <InstagramIcon size={16} className="shrink-0 text-brand-300" />
              @dsembalagenspoa
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    key: "pagamento",
    content: (
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-white">
          Formas de pagamento
        </h3>
        <div className="grid grid-cols-4 gap-1.5">
          {PAYMENT_METHODS.map((method) => (
            <span
              key={method.name}
              title={method.name}
              className="flex h-8 items-center justify-center rounded-md bg-white p-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={method.file}
                alt={method.name}
                className="h-full w-full object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "retirada",
    content: (
      <div>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-white">
          <MapPin size={14} className="text-brand-300" />
          Onde retirar
        </h3>
        <p className="text-xs leading-relaxed text-brand-200">
          Av. Adelino Ferreira Jardim, 170 - Núcleo 5
          <br />
          Rubem Berta - Porto Alegre - RS
        </p>
        <p className="mt-2 text-xs leading-relaxed text-brand-200">
          <span className="font-semibold text-white">Atendimento exclusivamente virtual.</span>
          <br />
          Este endereço é destinado somente à retirada de pedidos, mediante agendamento ou
          confirmação prévia.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          <Package size={12} />
          Retirada no local
        </span>
      </div>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container>
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.8fr_1.6fr_1.1fr] lg:gap-0 lg:py-5">
          {COLUMNS.map((column, index) => (
            <div
              key={column.key}
              className={`lg:px-6 ${index > 0 ? "lg:border-l lg:border-white/15" : "lg:pl-0"} ${
                index === COLUMNS.length - 1 ? "lg:pr-0" : ""
              }`}
            >
              {column.content}
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10 py-3">
        <Container>
          <p className="text-center text-xs text-brand-300">
            © {new Date().getFullYear()} DS Embalagens. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
