import React from "react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border-subtle bg-bg-primary">
      {/* Background Media with Dark Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85"
          alt="ZENJI Cyber Samurai Hero Drop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 filter grayscale contrast-125"
        />
        {/* Radial & Gradient Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-bg-primary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-border-strong bg-bg-elevated/80 backdrop-blur-md rounded text-xs font-system text-text-secondary tracking-widest">
          <span className="w-2 h-2 rounded-full bg-accent-flame animate-pulse" />
          <span>力 — AWAKENING // DROP 01 LIVE</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-text-primary leading-none">
          WEAR YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent-flame to-text-primary">
            INNER LORE
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          The warrior within refuses to fade into the crowd. Heavyweight anime-inspired Australian streetwear engineered as armor for the modern ronin.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/drop"
            className={buttonVariants({
              size: "lg",
              className: "bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider text-xs font-system h-12 px-8 shadow-lg",
            })}
          >
            SHOP THE DROP &rarr;
          </Link>
          <Link
            href="/lookbook"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-border-strong text-text-primary hover:bg-bg-elevated font-bold uppercase tracking-wider text-xs font-system h-12 px-8",
            })}
          >
            EDITORIAL LOOKBOOK
          </Link>
        </div>

        {/* Terminal readout strip */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-6 text-[10px] font-system text-text-tertiary">
          <span>SPEC: 280-460 GSM</span>
          <span>&bull;</span>
          <span>LIMITED RUN: 250 UNITS</span>
          <span>&bull;</span>
          <span>NO RESTOCKS EVER</span>
        </div>
      </div>
    </section>
  );
}
