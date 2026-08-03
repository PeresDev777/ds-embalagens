"use client";

import Link from "next/link";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { getProductImage } from "@/lib/productImage";
import { getCardDisplayName } from "@/lib/productName";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function CartDrawer() {
  const { lines, itemCount, isOpen, closeCart, updateQuantity, removeItem, clearCart } =
    useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <ShoppingBag size={20} className="text-brand-600" />
            Meu pedido
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag size={40} className="text-slate-300" />
            <p className="font-medium text-slate-600">Seu carrinho está vazio</p>
            <p className="text-sm text-slate-500">
              Adicione produtos para montar seu pedido.
            </p>
            <Link
              href="/"
              onClick={closeCart}
              className="mt-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-5">
            {lines.map((line) => {
              const displayName = getCardDisplayName(line.product);
              return (
              <li key={line.productId} className="flex gap-3 py-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getProductImage(line.product)}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-slate-800">
                      {displayName}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId)}
                      aria-label={`Remover ${displayName}`}
                      className="shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">{line.product.category}</p>
                  <div className="mt-1">
                    <QuantityStepper
                      editable
                      size="sm"
                      quantity={line.quantity}
                      onDecrease={() => updateQuantity(line.productId, line.quantity - 1)}
                      onIncrease={() => updateQuantity(line.productId, line.quantity + 1)}
                      onChange={(value) => updateQuantity(line.productId, value)}
                    />
                  </div>
                </div>
              </li>
              );
            })}
          </ul>
        )}

        {lines.length > 0 && (
          <footer className="space-y-4 border-t border-slate-100 px-5 py-4">
            <p className="text-sm text-slate-500">
              {itemCount} {itemCount === 1 ? "item" : "itens"} no pedido. O valor final é
              combinado direto no WhatsApp.
            </p>

            <a
              href={buildWhatsAppOrderUrl(lines)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
            >
              <WhatsAppIcon size={18} />
              Finalizar pedido no WhatsApp
            </a>
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-center text-sm font-medium text-slate-500 transition-colors hover:text-red-600"
            >
              Limpar carrinho
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
