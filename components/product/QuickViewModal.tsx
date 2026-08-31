"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Size } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SizeSelector } from "./SizeSelector";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/pricing";
import { toast } from "sonner";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentPrice = product.salePrice ?? product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    addItem({
      slug: product.slug,
      size: selectedSize,
      quantity: 1,
      priceAtAdd: currentPrice,
    });

    toast.success(`ADDED TO CART`, {
      description: `${product.name} (Size: ${selectedSize})`,
    });

    onOpenChange(false);
    setSelectedSize(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-bg-elevated border-border-strong text-text-primary p-0 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Gallery View */}
          <div className="relative bg-bg-elevated-2 aspect-[3/4] sm:aspect-auto">
            <Image
              src={product.images[activeImageIndex] ?? product.frontImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto p-1 bg-black/50 backdrop-blur-sm rounded">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-10 h-12 rounded overflow-hidden border ${
                      activeImageIndex === idx ? "border-accent-flame" : "border-transparent opacity-60"
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill sizes="40px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Action */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <DialogHeader className="text-left space-y-1 p-0">
                <div className="text-[11px] font-system text-text-tertiary">
                  COLLECTION // {product.collection}
                </div>
                <DialogTitle className="text-lg font-black uppercase tracking-tight text-text-primary">
                  {product.name}
                </DialogTitle>
                <div className="flex items-center gap-3 pt-1">
                  {product.onSale && product.salePrice ? (
                    <>
                      <span className="text-base font-bold text-accent-danger font-mono">
                        {formatCurrency(product.salePrice)}
                      </span>
                      <span className="text-sm text-text-tertiary line-through font-mono">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-[10px] font-system bg-accent-danger/20 text-accent-danger px-1.5 py-0.5 rounded font-bold">
                        SALE 15% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-bold text-text-primary font-mono">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>
              </DialogHeader>

              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                {product.description}
              </p>

              <div className="pt-2 border-t border-border-subtle">
                <SizeSelector
                  availableSizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={(size) => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  error={sizeError}
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider h-11 text-xs font-system flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.inStock ? "ADD TO CART" : "SOLD OUT"}</span>
              </Button>

              <Link
                href={`/drop/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="block text-center text-[11px] font-system text-text-secondary hover:text-text-primary transition-colors tracking-wider"
              >
                VIEW FULL DETAILS &rarr;
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
