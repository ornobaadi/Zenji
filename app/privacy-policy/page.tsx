import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest uppercase">
          LEGAL // SYSTEM PRIVACY
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
          PRIVACY PROTOCOL
        </h1>
        <p className="text-xs text-text-tertiary font-system">LAST UPDATED: 2026</p>
      </div>

      <div className="p-8 bg-bg-elevated border border-border-subtle rounded space-y-6 text-xs text-text-secondary leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">1. DATA COLLECTION</h2>
          <p>
            ZENJI collects customer contact information (email, shipping address, order details) strictly for the fulfillment of orders and dispatch tracking. We do not sell or lease personal customer data to external brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">2. COOKIES & LOCAL STORAGE</h2>
          <p>
            We use browser localStorage to maintain your shopping cart state between browser sessions so that your selections persist across page views.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary font-system">3. PROTOTYPE NOTICE</h2>
          <p>
            This website is a design and front-end engineering assessment prototype. No real financial transactions or live credit card information is collected or processed.
          </p>
        </section>
      </div>
    </main>
  );
}
