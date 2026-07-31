"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  onChange,
  editable = false,
  size = "md",
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onChange?: (value: number) => void;
  editable?: boolean;
  size?: "sm" | "md";
}) {
  const btnSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const iconSize = size === "sm" ? 15 : 17;
  const numberWidth = size === "sm" ? "w-7" : "w-10";

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Diminuir quantidade"
        className={`${btnSize} flex shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-700 active:scale-95`}
      >
        <Minus size={iconSize} />
      </button>
      {editable ? (
        <input
          type="number"
          inputMode="numeric"
          min={1}
          value={quantity}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value, 10);
            if (!Number.isNaN(value) && value > 0) onChange?.(value);
          }}
          onBlur={(e) => {
            const value = Number.parseInt(e.target.value, 10);
            if (Number.isNaN(value) || value < 1) onChange?.(1);
          }}
          aria-label="Quantidade"
          className={`${numberWidth} bg-transparent text-center text-sm font-semibold tabular-nums text-slate-800 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        />
      ) : (
        <span
          className={`${numberWidth} text-center text-sm font-semibold tabular-nums text-slate-800`}
        >
          {quantity}
        </span>
      )}
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Aumentar quantidade"
        className={`${btnSize} flex shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-700 active:scale-95`}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
