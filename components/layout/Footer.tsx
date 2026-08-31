import React from "react";
import Link from "next/link";
import { BRAND_CONTENT } from "@/data/content";

export function Footer() {
  return (
    <footer className="w-full bg-bg-elevated border-t border-border-subtle text-text-secondary text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-text-primary">
                ZENJI
              </span>
              <span className="text-xs font-system text-accent-flame border border-accent-flame/40 px-1.5 py-0.5 rounded">
                力
              </span>
            </Link>
            <p className="text-text-secondary text-xs leading-relaxed max-w-sm">
              Heavyweight anime-inspired Australian streetwear engineered for the modern ronin. Designed in Melbourne. No restocks. Ever.
            </p>
            <div className="pt-2 text-[11px] font-system text-text-tertiary">
              SYSTEM // ARCHIVE: LIVE &bull; REGION: AU
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="font-system font-bold text-text-primary text-[11px] tracking-widest">
              CATALOG
            </h4>
            <ul className="space-y-2">
              {BRAND_CONTENT.footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-text-primary transition-colors uppercase font-system text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Column */}
          <div className="space-y-3">
            <h4 className="font-system font-bold text-text-primary text-[11px] tracking-widest">
              LORE & BRAND
            </h4>
            <ul className="space-y-2">
              {BRAND_CONTENT.footerLinks.brand.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-text-primary transition-colors uppercase font-system text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h4 className="font-system font-bold text-text-primary text-[11px] tracking-widest">
              SUPPORT & LEGAL
            </h4>
            <ul className="space-y-2">
              {BRAND_CONTENT.footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-text-primary transition-colors uppercase font-system text-[11px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-system text-text-tertiary">
          <div>
            &copy; {new Date().getFullYear()} ZENJI STREETWEAR. ALL RIGHTS RESERVED.
          </div>
          <div className="text-text-tertiary">
            PROTOTYPE DEMONSTRATION &bull; NO REAL COMMERCE PROCESSED
          </div>
        </div>
      </div>
    </footer>
  );
}
