import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWhatsAppButton } from "@/components/layout/FloatingWhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DS Embalagens | Embalagens para delivery em Porto Alegre",
    template: "%s | DS Embalagens",
  },
  description:
    "Embalagens descartáveis para delivery em Porto Alegre e região: hambúrguer, pizza, marmita, copos, açaí, confeitaria, sacos e descartáveis em geral. Preço baixo e pronta entrega.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
