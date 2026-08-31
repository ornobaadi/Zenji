import React from "react";
import { BRAND_CONTENT } from "@/data/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-2">
        <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest uppercase">
          SUPPORT // FREQUENTLY ASKED QUESTIONS
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
          FAQ & CARE PROTOCOLS
        </h1>
        <p className="text-xs text-text-secondary">
          Everything you need to know regarding drops, fits, dispatch, and garment longevity.
        </p>
      </div>

      <div className="p-6 bg-bg-elevated border border-border-subtle rounded">
        <Accordion className="w-full">
          {BRAND_CONTENT.faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border-subtle py-2">
              <AccordionTrigger className="text-sm font-bold text-text-primary uppercase tracking-wide hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-text-secondary leading-relaxed pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
