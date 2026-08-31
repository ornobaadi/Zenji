import { BRAND_CONTENT } from "@/data/content";
import { PRODUCTS } from "@/data/products";
import { formatCurrency } from "@/lib/pricing";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
      <div className="max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-border-subtle bg-bg-elevated rounded text-xs font-system text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>SYSTEM // ZENJI ONLINE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-text-primary">
          WEAR YOUR <span className="text-accent-flame">INNER LORE</span>
        </h1>

        <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {BRAND_CONTENT.ethos.quote} Heavyweight anime-inspired Australian streetwear engineered for the modern ronin.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/drop"
            className={buttonVariants({
              size: "lg",
              className: "bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider",
            })}
          >
            SHOP THE DROP &rarr;
          </Link>
          <Link
            href="/lookbook"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-border-strong text-text-primary hover:bg-bg-elevated font-bold uppercase tracking-wider",
            })}
          >
            VIEW LOOKBOOK
          </Link>
        </div>

        <div className="pt-12 border-t border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          {PRODUCTS.slice(0, 4).map((product) => (
            <div key={product.slug} className="p-3 bg-bg-elevated border border-border-subtle rounded flex flex-col justify-between">
              <div>
                {product.tag && (
                  <Badge variant="outline" className="text-[10px] uppercase font-system border-border-strong mb-2">
                    {product.tag}
                  </Badge>
                )}
                <h3 className="text-xs font-bold uppercase text-text-primary line-clamp-1">
                  {product.name}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-text-tertiary font-system">{product.colorway}</span>
                <span className="font-bold text-accent-flame">
                  {formatCurrency(product.salePrice ?? product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
