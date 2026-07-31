import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/5551992341428"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-900/20 transition-transform hover:scale-105 active:scale-95"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
