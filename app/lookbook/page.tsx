"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOOKBOOK_ENTRIES } from "@/data/lookbook";
import { ArrowUpRight } from "lucide-react";

type ViewFilter = "ALL" | "FRONT" | "BACK" | "ON_MODEL";

export default function LookbookPage() {
  const [activeFilter, setActiveFilter] = useState<ViewFilter>("ALL");

  const filteredEntries = useMemo(() => {
    if (activeFilter === "ALL") return LOOKBOOK_ENTRIES;
    return LOOKBOOK_ENTRIES.filter((entry) => entry.view === activeFilter);
  }, [activeFilter]);

  const tabs: ViewFilter[] = ["ALL", "FRONT", "BACK", "ON_MODEL"];

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
        <div className="space-y-1">
          <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest">
            EDITORIAL // CAPSULE 01
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            THE LOOKBOOK
          </h1>
          <p className="text-xs text-text-secondary max-w-md">
            Visual archive of the Origin Drop. Shot on 35mm in Tokyo and Melbourne.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded text-xs font-system font-bold uppercase transition-all tracking-wider ${
                activeFilter === tab
                  ? "bg-text-primary text-bg-primary"
                  : "bg-bg-elevated text-text-secondary border border-border-subtle hover:text-text-primary"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Lookbook Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((entry) => (
          <Link
            key={entry.id}
            href={`/drop/${entry.productSlug}`}
            className="group relative aspect-[3/4] bg-bg-elevated border border-border-subtle hover:border-border-strong rounded overflow-hidden flex flex-col justify-end p-5"
          >
            {/* Image */}
            <Image
              src={entry.image}
              alt={entry.productName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Top View Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-black/70 backdrop-blur-sm border border-border-strong text-text-secondary text-[10px] font-system font-bold px-2 py-1 rounded">
                VIEW: {entry.view.replace("_", " ")}
              </span>
            </div>

            {/* Bottom Info Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-system text-accent-flame font-bold">
                  {entry.tag ?? "THE ORIGIN DROP"}
                </div>
                <h3 className="text-sm font-bold uppercase text-text-primary">
                  {entry.productName}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-bg-elevated-2 border border-border-strong flex items-center justify-center text-text-primary group-hover:bg-text-primary group-hover:text-bg-primary transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
