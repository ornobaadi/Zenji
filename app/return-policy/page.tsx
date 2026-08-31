import React from "react";

export default function ReturnPolicyPage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest uppercase">
          DISPATCH // RETURN PROTOCOL
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
          EXCHANGES & RETURNS
        </h1>
        <p className="text-xs text-text-tertiary font-system">PROTOCOL 3.1 &bull; 14-DAY WINDOW</p>
      </div>

      <div className="p-8 bg-bg-elevated border border-border-subtle rounded space-y-6 text-xs text-text-secondary leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">1. 14-DAY RETURN WINDOW</h2>
          <p>
            We offer store credits or size exchanges on all unworn, unwashed garments within 14 days of delivery. Items must have original tags attached and original vault packaging intact.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">2. EXCHANGES ON SOLD-OUT DROPS</h2>
          <p>
            Due to the strictly limited nature of each capsule, if an item has completely sold out of alternative sizes, we will issue a full store credit or refund upon receipt of the returned piece.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">3. INITIATING A RETURN</h2>
          <p>
            To begin a return transmission, contact our team at contact@zenji.shop with your order ID (e.g. ZNJ-XXXXXX).
          </p>
        </section>
      </div>
    </main>
  );
}
