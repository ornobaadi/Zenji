import React from "react";

export default function TermsPage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest uppercase">
          LEGAL // TERMS & CONDITIONS
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
          TERMS OF SERVICE
        </h1>
        <p className="text-xs text-text-tertiary font-system">LAST REVISED: 2026</p>
      </div>

      <div className="p-8 bg-bg-elevated border border-border-subtle rounded space-y-6 text-xs text-text-secondary leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">1. LIMITED CAPSULES</h2>
          <p>
            All ZENJI products are released in strictly limited numbers. Placing an item in your cart does not reserve inventory until checkout completion is registered.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">2. INTELLECTUAL PROPERTY</h2>
          <p>
            All custom graphics, cybernetic samurai artwork, copy, and brand iconography are proprietary assets of ZENJI. Reproduction without written consent is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">3. CURRENCY & PRICING</h2>
          <p>
            All prices displayed on this storefront are denominated in Australian Dollars (AUD).
          </p>
        </section>
      </div>
    </main>
  );
}
