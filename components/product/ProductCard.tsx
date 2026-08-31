"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/pricing";
import { QuickViewModal } from "./QuickViewModal";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="group relative flex flex-col bg-bg-elevated border border-border-subtle hover:border-border-strong rounded transition-all overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Frame (3:4 aspect ratio) */}
        <Link href={`/drop/${product.slug}`} className="relative aspect-[3/4] w-full bg-bg-elevated-2 overflow-hidden block">
          {/* Default Front Image */}
          <Image
            src={product.frontImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Hover Back Image */}
          <Image
            src={product.backImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-300 absolute inset-0 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.onSale && (
              <span className="bg-accent-danger text-white text-[10px] font-system font-bold px-2 py-0.5 rounded tracking-wider shadow-sm">
                SALE 15% OFF
              </span>
            )}
            {!product.inStock && (
              <span className="bg-neutral-800 text-text-tertiary text-[10px] font-system font-bold px-2 py-0.5 rounded tracking-wider">
                SOLD OUT
              </span>
            )}
            {product.tag && (
              <span className="bg-black/70 backdrop-blur-sm text-text-primary border border-border-strong text-[9px] font-system px-1.5 py-0.5 rounded tracking-wider">
                {product.tag}
              </span>
            )}
          </div>

          {/* Quick View Button Hover Overlay */}
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="w-full bg-bg-primary/90 hover:bg-bg-primary backdrop-blur-md text-text-primary border border-border-strong text-[11px] font-system font-bold py-2 px-3 rounded tracking-wider transition-colors shadow-lg"
            >
              QUICK VIEW &rarr;
            </button>
          </div>
        </Link>

        {/* Product Information */}
        <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2">
          <div>
            <div className="text-[10px] font-system text-text-tertiary tracking-wider">
              {product.colorway}
            </div>
            <Link
              href={`/drop/${product.slug}`}
              className="font-bold text-xs uppercase text-text-primary hover:text-accent-flame transition-colors line-clamp-1 mt-0.5 tracking-tight"
            >
              {product.name}
            </Link>
          </div>

          {/* Price & Stock */}
          <div className="flex items-center justify-between pt-1 border-t border-border-subtle/50 text-xs font-mono">
            <div className="flex items-center gap-2">
              {product.onSale && product.salePrice ? (
                <>
                  <span className="font-bold text-accent-danger">
                    {formatCurrency(product.salePrice)}
                  </span>
                  <span className="text-text-tertiary line-through text-[11px]">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-text-primary">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-system text-text-tertiary">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  product.inStock ? "bg-success" : "bg-text-tertiary"
                }`}
              />
              <span>{product.inStock ? "IN STOCK" : "ARCHIVED"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
