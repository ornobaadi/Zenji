"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { openDrawer, totalItemCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Nav & Brand Logo */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-text-primary group-hover:text-accent-flame transition-colors">
              ZENJI
            </span>
            <span className="text-xs font-system text-accent-flame border border-accent-flame/40 px-1.5 py-0.5 rounded">
              力
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/drop"
            className="text-xs font-system text-text-secondary hover:text-text-primary transition-colors tracking-widest"
          >
            DROP 01
          </Link>
          <Link
            href="/collection"
            className="text-xs font-system text-text-secondary hover:text-text-primary transition-colors tracking-widest"
          >
            COLLECTION
          </Link>
          <Link
            href="/lookbook"
            className="text-xs font-system text-text-secondary hover:text-text-primary transition-colors tracking-widest"
          >
            LOOKBOOK
          </Link>
          <Link
            href="/our-story"
            className="text-xs font-system text-text-secondary hover:text-text-primary transition-colors tracking-widest"
          >
            OUR STORY
          </Link>
        </nav>

        {/* Right: Actions (Search, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle Search"
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Cart Trigger with live badge */}
          <button
            onClick={openDrawer}
            aria-label="Open Cart"
            className="relative p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-5 h-5 text-text-primary" />
            {totalItemCount > 0 && (
              <span className="inline-flex items-center justify-center bg-accent-flame text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full min-w-[18px]">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Input (Phase 1 UI) */}
      {showSearch && (
        <div className="px-4 py-3 bg-bg-elevated border-t border-border-subtle">
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="SEARCH THE VAULT (E.G. HOODIE, TEE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-elevated-2 border border-border-strong rounded px-4 py-2 text-xs font-system text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-flame"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
