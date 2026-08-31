"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, Size } from "@/types";
import { Gallery } from "@/components/product/Gallery";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/pricing";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const activePrice = product.salePrice ?? product.price;

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
      priceAtAdd: activePrice,
    });

    toast.success("ADDED TO CART", {
      description: `${product.name} (Size: ${selectedSize})`,
    });
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-system text-text-tertiary">
        <Link href="/" className="hover:text-text-primary transition-colors">
          HOME
        </Link>
        <span>/</span>
        <Link href="/drop" className="hover:text-text-primary transition-colors">
          DROP 01
        </Link>
        <span>/</span>
        <span className="text-text-primary uppercase truncate">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <Gallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Info & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Meta */}
          <div className="space-y-2 pb-6 border-b border-border-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-system text-accent-flame font-bold tracking-widest">
                COLLECTION // {product.collection}
              </span>
              <span className="text-xs font-system text-text-tertiary">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-text-primary">
              {product.name}
            </h1>

            <div className="text-xs font-system text-text-secondary tracking-wider">
              COLORWAY: <strong className="text-text-primary">{product.colorway}</strong>
            </div>

            {/* Price row */}
            <div className="flex items-center gap-3 pt-2">
              {product.onSale && product.salePrice ? (
                <>
                  <span className="text-2xl font-bold font-mono text-accent-danger">
                    {formatCurrency(product.salePrice)}
                  </span>
                  <span className="text-base font-mono text-text-tertiary line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs font-system bg-accent-danger/20 text-accent-danger px-2 py-0.5 rounded font-bold">
                    SAVE 15%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold font-mono text-text-primary">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-4">
            <SizeSelector
              availableSizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={(size) => {
                setSelectedSize(size);
                setSizeError(false);
              }}
              error={sizeError}
            />

            {/* Primary Add to Cart + Wishlist button row */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider h-13 text-xs font-system flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.inStock ? "ADD TO CART" : "SOLD OUT"}</span>
              </Button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Toggle Wishlist"
                className={`p-3.5 rounded border transition-colors flex items-center justify-center ${
                  isWishlisted
                    ? "bg-accent-danger/20 border-accent-danger text-accent-danger"
                    : "bg-bg-elevated border-border-strong text-text-secondary hover:text-text-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-accent-danger" : ""}`} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="pt-2">
            <p className="text-sm text-text-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Accordion Specs */}
          <div className="pt-4 border-t border-border-subtle">
            <Accordion className="w-full">
              <AccordionItem value="details" className="border-b border-border-subtle">
                <AccordionTrigger className="text-xs font-system font-bold text-text-primary uppercase tracking-wider py-3.5 hover:no-underline">
                  PRODUCT DETAILS & FABRICATION
                </AccordionTrigger>
                <AccordionContent className="text-xs text-text-secondary space-y-1.5 pb-4">
                  <ul className="list-disc list-inside space-y-1">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sizing" className="border-b border-border-subtle">
                <AccordionTrigger className="text-xs font-system font-bold text-text-primary uppercase tracking-wider py-3.5 hover:no-underline">
                  SIZING & FIT GUIDE
                </AccordionTrigger>
                <AccordionContent className="text-xs text-text-secondary space-y-2 pb-4">
                  <p>
                    Custom boxy drop-shoulder cut. True to size for signature oversized silhouette. Size down for standard fit.
                  </p>
                  <div className="grid grid-cols-3 gap-2 p-2 bg-bg-elevated-2 rounded font-mono text-[11px] text-center border border-border-subtle">
                    <div>M: Chest 58cm</div>
                    <div>L: Chest 61cm</div>
                    <div>XL: Chest 64cm</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b border-border-subtle">
                <AccordionTrigger className="text-xs font-system font-bold text-text-primary uppercase tracking-wider py-3.5 hover:no-underline">
                  EXPRESS SHIPPING & RETURNS
                </AccordionTrigger>
                <AccordionContent className="text-xs text-text-secondary space-y-2 pb-4">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-accent-flame shrink-0" />
                    <span>Free express shipping within Australia on orders over A$100.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-accent-flame shrink-0" />
                    <span>14-day exchange or store credit guarantee.</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products Strip */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-border-subtle space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary">
              YOU MAY ALSO LIKE
            </h3>
            <Link
              href="/drop"
              className="text-xs font-system text-text-secondary hover:text-text-primary transition-colors tracking-widest"
            >
              VIEW ALL &rarr;
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </main>
  );
}
