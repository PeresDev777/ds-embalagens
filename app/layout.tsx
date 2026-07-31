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

const SITE_URL = "https://ds-embalagens.vercel.app";
const SITE_TITLE = "DS Embalagens | Embalagens para delivery em Porto Alegre";
const SITE_DESCRIPTION =
  "Embalagens descartáveis para delivery em Porto Alegre e região: hambúrguer, pizza, marmita, copos, açaí, confeitaria, sacos e descartáveis em geral. Preço baixo e pronta entrega.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | DS Embalagens",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "DS Embalagens",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "DS Embalagens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo/og-image.png"],
  },
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
