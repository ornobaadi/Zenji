import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_CONTENT } from "@/data/content";
import { buttonVariants } from "@/components/ui/button";

export default function OurStoryPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Title & Introduction */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-system text-accent-flame font-bold tracking-widest uppercase">
          <span>力 &bull; MANIFESTO // ORIGIN LORE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-text-primary">
          THE WARRIOR WITHIN REFUSES TO FADE
        </h1>
        <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {BRAND_CONTENT.ethos.body}
        </p>
      </div>

      {/* Feature Image */}
      <div className="relative aspect-[16/9] w-full rounded overflow-hidden border border-border-subtle bg-bg-elevated">
        <Image
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1600&q=85"
          alt="ZENJI Cyber Samurai Atelier"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1000px"
          className="object-cover filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 font-system text-xs text-text-secondary bg-black/70 backdrop-blur-sm px-3.5 py-1.5 rounded border border-border-subtle">
          EST. 2024 &bull; MELBOURNE // TOKYO
        </div>
      </div>

      {/* Narrative Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-text-secondary leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-text-primary tracking-tight">
            I. THE PHILOSOPHY OF 力 (CHIKARA)
          </h2>
          <p>
            The Japanese kanji 力 represents strength, raw willpower, and unyielding discipline. In an era dominated by hyper-speed disposable trends, we build pieces that endure. Every drop is crafted in limited batches to ensure quality control, deliberate exclusivity, and respect for the wearer.
          </p>
          <p>
            When you put on ZENJI, you are not wearing merch. You are donning armor engineered for the nocturnal explorer, the digital artisan, and the urban ronin.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-text-primary tracking-tight">
            II. THE ANATOMY OF STRUCTURE
          </h2>
          <p>
            We obsess over weight and drape. Our t-shirts are milled at a substantial 280 GSM, and our hoodies are constructed with 460 GSM high-density French Terry. Dropped shoulders, double-stitched ribs, and custom vintage-wash baths give each piece an architectural silhouette that never collapses.
          </p>
          <p>
            No restocks. Once a capsule sells out, its patterns are retired to our digital vault forever.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="pt-8 border-t border-border-subtle text-center space-y-4">
        <h3 className="text-2xl font-black uppercase text-text-primary">
          EXPLORE THE CURRENT CAPSULE
        </h3>
        <p className="text-xs text-text-secondary">
          Limited units remaining in Drop 01.
        </p>
        <div>
          <Link
            href="/drop"
            className={buttonVariants({
              size: "lg",
              className: "bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider text-xs font-system h-12 px-8 shadow-lg",
            })}
          >
            SHOP THE DROP &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
