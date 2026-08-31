"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/pricing";
import { CheckCircle2, PackageCheck, ArrowRight, Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("zenji_last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-10">
      {/* Icon & Status */}
      <div className="space-y-4">
        <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 mx-auto flex items-center justify-center text-success">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-system text-accent-flame font-bold tracking-widest uppercase">
            DISPATCH SIMULATION // SUCCESSFUL
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
            ARMOR CONFIRMED
          </h1>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Your simulated order has been registered in the ZENJI dispatch terminal.
          </p>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="p-8 bg-bg-elevated border border-border-subtle rounded text-left space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-subtle gap-2">
          <div>
            <div className="text-[11px] font-system text-text-tertiary">ORDER IDENTIFIER</div>
            <div className="text-lg font-mono font-bold text-accent-flame">
              {order ? order.id : "ZNJ-DEMO-849201"}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-[11px] font-system text-text-tertiary">STATUS</div>
            <div className="text-xs font-system font-bold text-success">
              PREPARING DISPATCH
            </div>
          </div>
        </div>

        {/* Shipping Address Summary */}
        {order?.shippingAddress && (
          <div className="space-y-2 text-xs">
            <div className="font-system font-bold text-text-primary uppercase tracking-wider">
              SHIPPING TO
            </div>
            <div className="text-text-secondary font-mono leading-relaxed">
              <p className="font-bold text-text-primary">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address1}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postcode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Dispatch timeline */}
        <div className="p-4 bg-bg-elevated-2 border border-border-subtle rounded flex items-center gap-3 text-xs">
          <Truck className="w-5 h-5 text-accent-flame shrink-0" />
          <div className="space-y-0.5">
            <p className="font-bold text-text-primary font-system text-[11px]">
              ESTIMATED DELIVERY: 2-4 BUSINESS DAYS
            </p>
            <p className="text-[11px] text-text-secondary">
              Express courier tracking notification will arrive via {order?.shippingAddress?.email ?? "email"}.
            </p>
          </div>
        </div>

        {/* Summary pricing */}
        {order && (
          <div className="pt-4 border-t border-border-subtle space-y-2 text-xs font-system">
            <div className="flex justify-between text-text-secondary">
              <span>SUBTOTAL</span>
              <span className="font-mono text-text-primary">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>SHIPPING</span>
              <span className="font-mono text-text-primary">
                {order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}
              </span>
            </div>
            <div className="pt-3 border-t border-border-subtle flex justify-between text-sm font-bold text-text-primary">
              <span>TOTAL SIMULATED</span>
              <span className="font-mono text-accent-flame text-base">{formatCurrency(order.total)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Return Home CTA */}
      <div className="pt-4">
        <Link
          href="/drop"
          className={buttonVariants({
            size: "lg",
            className: "bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider text-xs font-system h-12 px-8 shadow-lg inline-flex items-center gap-2",
          })}
        >
          <span>CONTINUE EXPLORING</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
