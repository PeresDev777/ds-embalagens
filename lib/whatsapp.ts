import type { CartLine } from "@/context/CartContext";

const WHATSAPP_NUMBER = "5551992341428";

export function buildOrderMessage(lines: CartLine[]): string {
  const itemLines = lines.map((line) => `${line.quantity}x ${line.product.name}`);

  return [
    "Olá! Gostaria de fazer o seguinte pedido:",
    "",
    ...itemLines,
    "",
    "Aguardo o valor e condições de entrega.",
  ].join("\n");
}

export function buildWhatsAppOrderUrl(lines: CartLine[]): string {
  const message = buildOrderMessage(lines);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppContactUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
