import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_CONTENT } from "@/data/content";

export function AboutSection() {
  return (
    <section className="w-full py-24 border-b border-border-subtle bg-bg-elevated/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Imagery */}
          <div className="relative aspect-[4/3] rounded overflow-hidden border border-border-subtle bg-bg-elevated-2">
            <Image
              src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80"
              alt="ZENJI Atelier craft"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-system text-[11px] text-text-secondary bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-border-subtle">
              MELBOURNE ATELIER &bull; ARCHIVE SPEC: 460GSM
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-system text-accent-flame font-bold tracking-widest">
              <span>力 &bull; THE CRAFT & ANATOMY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-text-primary leading-tight">
              HEAVYWEIGHT ARMOR FOR THE MODERN RONIN
            </h2>

            <p className="text-text-secondary text-sm leading-relaxed">
              Every ZENJI silhouette begins with bespoke heavy-gauge fabrics sourced exclusively for structure and longevity. We reject flimsy fast-fashion cuts in favor of drop-shoulder architectural drapes, custom distress treatments, and museum-grade screenprinting ink.
            </p>

            <p className="text-text-secondary text-sm leading-relaxed">
              {BRAND_CONTENT.ethos.body}
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/our-story"
                className="text-xs font-system font-bold text-text-primary hover:text-accent-flame transition-colors tracking-widest flex items-center gap-2"
              >
                <span>READ THE FULL LORE</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
