import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function SaleRail() {
  const saleProducts = PRODUCTS.filter((p) => p.onSale);

  if (saleProducts.length === 0) return null;

  return (
    <section className="w-full py-16 border-b border-border-subtle bg-bg-elevated/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-system text-accent-danger tracking-widest font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-danger animate-pulse" />
              <span>LIMITED PROMO // 15% OFF SELECTED PIECES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-text-primary">
              THE VAULT ARCHIVE
            </h2>
          </div>
          <Link
            href="/drop"
            className="text-xs font-system text-text-secondary hover:text-text-primary transition-colors tracking-widest flex items-center gap-1.5"
          >
            <span>VIEW ALL ITEMS</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Horizontal Rail / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {saleProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
