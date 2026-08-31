"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SlidersHorizontal } from "lucide-react";

type FilterCollection = "ALL" | "THE_ORIGIN_DROP" | "SEASON_01";

export default function CollectionPage() {
  const [selectedCollection, setSelectedCollection] = useState<FilterCollection>("ALL");

  const filteredProducts = useMemo(() => {
    if (selectedCollection === "ALL") return PRODUCTS;
    return PRODUCTS.filter((p) => p.collection === selectedCollection);
  }, [selectedCollection]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
        <div className="space-y-1">
          <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest">
            ARCHIVE // COMPLETE CATALOG
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            THE CATALOG
          </h1>
          <p className="text-xs text-text-secondary max-w-md">
            All season capsules and tactical streetwear releases.
          </p>
        </div>

        {/* Collection Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "THE_ORIGIN_DROP", "SEASON_01"] as FilterCollection[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCollection(tab)}
              className={`px-3 py-1.5 rounded text-xs font-system font-bold uppercase transition-all ${
                selectedCollection === tab
                  ? "bg-text-primary text-bg-primary"
                  : "bg-bg-elevated text-text-secondary border border-border-subtle hover:text-text-primary"
              }`}
            >
              {tab.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={filteredProducts} columns={4} />
    </main>
  );
}
