"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
  productName: string;
}

export function Gallery({ images, productName }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-[3/4] w-full bg-bg-elevated-2 border border-border-subtle rounded overflow-hidden">
        <Image
          src={images[activeIndex] ?? images[0]}
          alt={`${productName} view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-system text-text-secondary border border-border-subtle">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Selector Rail */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-20 aspect-[3/4] rounded overflow-hidden border transition-all shrink-0 ${
                  isActive
                    ? "border-accent-flame ring-1 ring-accent-flame opacity-100"
                    : "border-border-subtle opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
