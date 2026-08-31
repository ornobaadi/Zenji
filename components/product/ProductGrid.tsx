import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-text-secondary border border-border-subtle bg-bg-elevated rounded p-8">
        <p className="font-bold uppercase tracking-wider text-sm">NO PRODUCTS FOUND</p>
        <p className="text-xs font-system text-text-tertiary mt-1">CHECK BACK WHEN THE NEXT DROP GOES LIVE.</p>
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid gap-4 sm:gap-6 ${gridColsClass}`}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
