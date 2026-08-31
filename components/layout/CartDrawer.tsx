"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { PRODUCTS } from "@/data/products";
import { calculateSubtotal, formatCurrency, getFreeShippingProgress } from "@/lib/pricing";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function CartDrawer() {
  const { state, closeDrawer, updateQuantity, removeItem, totalItemCount } = useCart();
  const subtotal = calculateSubtotal(state.items);
  const { progress, remaining, isFree } = getFreeShippingProgress(subtotal);

  // Map cart items with their product metadata
  const enrichedItems = state.items.map((item) => {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    return {
      ...item,
      product,
    };
  });

  return (
    <Sheet open={state.isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-bg-elevated border-l border-border-subtle text-text-primary flex flex-col p-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border-subtle flex flex-row items-center justify-between">
          <SheetTitle className="text-base font-bold font-system text-text-primary tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-accent-flame" />
            <span>YOUR CART ({totalItemCount})</span>
          </SheetTitle>
        </SheetHeader>

        {/* Free Shipping Progress Bar */}
        <div className="px-6 py-3 bg-bg-elevated-2 border-b border-border-subtle text-xs">
          <div className="flex justify-between items-center mb-1.5 font-system text-[11px]">
            <span className="text-text-secondary">
              {isFree ? (
                <span className="text-success font-bold">QUALIFIED FOR FREE SHIPPING</span>
              ) : (
                <span>
                  ADD <strong className="text-text-primary">{formatCurrency(remaining)}</strong> MORE FOR FREE SHIPPING
                </span>
              )}
            </span>
            <span className="text-text-tertiary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-flame transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border-subtle">
          {enrichedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-bg-elevated-2 border border-border-subtle flex items-center justify-center text-text-tertiary">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-primary uppercase tracking-wide">Your cart is empty</p>
                <p className="text-xs text-text-secondary">Explore our latest drops to claim your armor.</p>
              </div>
              <Link
                href="/drop"
                onClick={closeDrawer}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "border-border-strong uppercase tracking-wider font-system text-xs",
                })}
              >
                BROWSE DROP 01 &rarr;
              </Link>
            </div>
          ) : (
            enrichedItems.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 bg-bg-elevated-2 border border-border-subtle rounded shrink-0 overflow-hidden">
                  <Image
                    src={item.product?.frontImage ?? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80"}
                    alt={item.product?.name ?? item.slug}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/drop/${item.slug}`}
                        onClick={closeDrawer}
                        className="text-xs font-bold uppercase text-text-primary hover:text-accent-flame transition-colors line-clamp-1"
                      >
                        {item.product?.name ?? item.slug}
                      </Link>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        aria-label="Remove item"
                        className="text-text-tertiary hover:text-accent-danger transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] font-system text-text-tertiary mt-0.5">
                      SIZE: <span className="text-text-secondary font-bold">{item.size}</span>
                    </p>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border-subtle rounded bg-bg-elevated-2">
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                        className="p-1.5 text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                        className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-xs font-mono text-text-primary">
                      {formatCurrency(item.priceAtAdd * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {enrichedItems.length > 0 && (
          <div className="p-6 bg-bg-elevated-2 border-t border-border-subtle space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-bold text-text-primary">
                <span>SUBTOTAL</span>
                <span className="font-mono text-accent-flame">{formatCurrency(subtotal)}</span>
              </div>
              <p className="text-[11px] text-text-tertiary">
                Taxes and shipping calculated at checkout.
              </p>
            </div>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className={buttonVariants({
                size: "lg",
                className: "w-full bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider flex items-center justify-center gap-2",
              })}
            >
              <span>CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
