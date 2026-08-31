"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "featured" | "price-asc" | "price-desc" | "sale";

export default function DropPage() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const sortedProducts = useMemo(() => {
    const list = [...PRODUCTS];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case "price-desc":
        return list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case "sale":
        return list.filter((p) => p.onSale);
      case "featured":
      default:
        return list;
    }
  }, [sortBy]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
        <div className="space-y-1">
          <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest">
            COLLECTION // CAPSULE 01
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            DROP 01: THE ORIGIN
          </h1>
          <p className="text-xs text-text-secondary max-w-md">
            Strictly limited batch. Once sold out, pieces enter the permanent vault.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-system text-text-tertiary">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>SORT:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-bg-elevated border border-border-strong text-text-primary text-xs font-system py-2 px-3 rounded focus:outline-none focus:border-accent-flame cursor-pointer"
          >
            <option value="featured">FEATURED / ALL ({PRODUCTS.length})</option>
            <option value="price-asc">PRICE: LOW &rarr; HIGH</option>
            <option value="price-desc">PRICE: HIGH &rarr; LOW</option>
            <option value="sale">ON SALE ONLY</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={sortedProducts} columns={4} />
    </main>
  );
}
