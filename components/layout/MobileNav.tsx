"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRAND_CONTENT } from "@/data/content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            aria-label="Open mobile menu"
            className="p-2 text-text-secondary hover:text-text-primary focus:outline-none md:hidden"
          />
        }
      >
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-bg-elevated border-r border-border-subtle text-text-primary p-6 flex flex-col justify-between w-4/5 max-w-sm">
        <div>
          <SheetHeader className="text-left pb-6 border-b border-border-subtle">
            <SheetTitle className="text-xl font-black tracking-tight text-text-primary flex items-center gap-2">
              <span>ZENJI</span>
              <span className="text-accent-flame text-sm font-system font-normal">力</span>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-5 py-6">
            <Link
              href="/drop"
              onClick={() => setOpen(false)}
              className="text-lg font-bold uppercase tracking-wider text-text-primary hover:text-accent-flame transition-colors"
            >
              DROP 01
            </Link>
            <Link
              href="/collection"
              onClick={() => setOpen(false)}
              className="text-lg font-bold uppercase tracking-wider text-text-primary hover:text-accent-flame transition-colors"
            >
              COLLECTION
            </Link>
            <Link
              href="/lookbook"
              onClick={() => setOpen(false)}
              className="text-lg font-bold uppercase tracking-wider text-text-primary hover:text-accent-flame transition-colors"
            >
              LOOKBOOK
            </Link>
            <Link
              href="/our-story"
              onClick={() => setOpen(false)}
              className="text-lg font-bold uppercase tracking-wider text-text-primary hover:text-accent-flame transition-colors"
            >
              OUR STORY
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-border-subtle space-y-3">
          <div className="text-xs font-system text-text-tertiary">SYSTEM // STATUS: ONLINE</div>
          <div className="text-xs text-text-secondary">
            {BRAND_CONTENT.ethos.quote}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
