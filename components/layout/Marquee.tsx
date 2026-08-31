import React from "react";
import { BRAND_CONTENT } from "@/data/content";

export function Marquee() {
  const items = BRAND_CONTENT.marqueeText;

  return (
    <div className="w-full bg-bg-elevated border-b border-border-subtle overflow-hidden py-2 select-none">
      <div className="flex whitespace-nowrap overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-8 text-xs font-system text-text-secondary tracking-widest px-4">
          {items.map((text, i) => (
            <React.Fragment key={i}>
              <span className="hover:text-text-primary transition-colors cursor-default">
                {text}
              </span>
              <span className="text-accent-flame text-sm">&bull;</span>
            </React.Fragment>
          ))}
          {/* Repeat for full-width coverage in static phase */}
          {items.map((text, i) => (
            <React.Fragment key={`repeat-${i}`}>
              <span className="hover:text-text-primary transition-colors cursor-default">
                {text}
              </span>
              <span className="text-accent-flame text-sm">&bull;</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
