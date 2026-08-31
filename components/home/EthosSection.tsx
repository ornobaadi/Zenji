import React from "react";
import Link from "next/link";
import { BRAND_CONTENT } from "@/data/content";
import { buttonVariants } from "@/components/ui/button";

export function EthosSection() {
  return (
    <section className="relative w-full py-28 border-b border-border-subtle bg-bg-primary overflow-hidden">
      {/* Background Accent Grid / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b7ce0_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="text-xs font-system text-accent-flame font-bold tracking-widest uppercase">
          {BRAND_CONTENT.ethos.kicker}
        </div>

        <blockquote className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary leading-tight">
          &ldquo;{BRAND_CONTENT.ethos.quote}&rdquo;
        </blockquote>

        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {BRAND_CONTENT.ethos.body}
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/our-story"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-border-strong text-text-primary hover:bg-bg-elevated text-xs font-system font-bold uppercase tracking-wider h-11 px-8",
            })}
          >
            EXPLORE THE MANIFESTO &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
