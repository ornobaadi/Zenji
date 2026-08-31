import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export function LatestDrops() {
  return (
    <section className="w-full py-20 border-b border-border-subtle bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-system text-accent-flame tracking-widest font-bold">
              COLLECTION // DROP 01
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-text-primary">
              LATEST DROPS
            </h2>
          </div>
          <div className="text-xs font-system text-text-tertiary">
            CAPSULE 01 &bull; {PRODUCTS.length} PIECES TOTAL
          </div>
        </div>

        {/* 4-column Product Grid */}
        <ProductGrid products={PRODUCTS} columns={4} />

        {/* Bottom CTA */}
        <div className="pt-6 text-center">
          <Link
            href="/drop"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-border-strong bg-bg-elevated hover:bg-bg-elevated-2 text-text-primary text-xs font-system font-bold uppercase tracking-widest rounded transition-all"
          >
            <span>EXPLORE FULL CAPSULE ({PRODUCTS.length})</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
