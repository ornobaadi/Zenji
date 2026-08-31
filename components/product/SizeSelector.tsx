"use client";

import React from "react";
import { Size } from "@/types";
import { cn } from "@/lib/utils";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface SizeSelectorProps {
  availableSizes: Size[];
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
  error?: boolean;
}

export function SizeSelector({
  availableSizes,
  selectedSize,
  onSelectSize,
  error = false,
}: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-system">
        <span className="text-text-secondary">
          SELECT SIZE: <strong className="text-text-primary">{selectedSize ?? "REQUIRED"}</strong>
        </span>
        {error && (
          <span className="text-accent-danger font-bold animate-pulse">
            PLEASE SELECT A SIZE
          </span>
        )}
      </div>

      <div className={cn("flex flex-wrap gap-2", error && "ring-1 ring-accent-danger p-1 rounded")}>
        {ALL_SIZES.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectSize(size)}
              className={cn(
                "min-w-[44px] h-10 px-3 flex items-center justify-center font-mono text-xs font-bold rounded border transition-all",
                isSelected
                  ? "bg-text-primary text-bg-primary border-text-primary shadow-sm"
                  : isAvailable
                  ? "bg-bg-elevated text-text-primary border-border-strong hover:border-text-primary hover:bg-bg-elevated-2"
                  : "bg-bg-elevated/40 text-text-tertiary border-border-subtle/50 cursor-not-allowed line-through opacity-40"
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
