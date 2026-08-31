"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/hooks/useCart";
import { PRODUCTS } from "@/data/products";
import {
  calculateShipping,
  calculateSubtotal,
  calculateTotal,
  formatCurrency,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/pricing";
import { createOrderSnapshot } from "@/lib/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  address1: z.string().min(5, "Street address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postcode: z.string().min(3, "Postcode is required"),
  country: z.string().min(2, "Country is required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("VERIFYING DETAILS...");

  const subtotal = calculateSubtotal(state.items);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: "Australia",
      state: "VIC",
      city: "Melbourne",
    },
  });

  const enrichedItems = state.items.map((item) => ({
    ...item,
    product: PRODUCTS.find((p) => p.slug === item.slug),
  }));

  const onSubmit = async (data: ShippingFormData) => {
    if (state.items.length === 0) return;

    setIsProcessing(true);
    setProcessingStep("VERIFYING ARMOR INVENTORY...");

    // Simulated transaction latency
    await new Promise((r) => setTimeout(r, 900));
    setProcessingStep("SIMULATING ENCRYPTED PAYMENT...");
    await new Promise((r) => setTimeout(r, 900));
    setProcessingStep("CONFIRMING VAULT DISPATCH...");
    await new Promise((r) => setTimeout(r, 600));

    const order = createOrderSnapshot(state.items, data);

    try {
      sessionStorage.setItem("zenji_last_order", JSON.stringify(order));
    } catch {
      // Ignore sessionStorage issues
    }

    clearCart();
    router.push("/order-confirmed");
  };

  if (state.items.length === 0 && !isProcessing) {
    return (
      <main className="flex-1 max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-text-primary">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-xs text-text-secondary">
          Select pieces from Drop 01 before proceeding to checkout.
        </p>
        <div>
          <Link
            href="/drop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-bg-primary text-xs font-system font-bold uppercase rounded hover:bg-neutral-200 transition-colors"
          >
            &larr; RETURN TO CATALOG
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/drop"
          className="inline-flex items-center gap-2 text-xs font-system text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO CATALOG</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Shipping & Payment Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-[11px] font-system text-accent-flame font-bold tracking-widest">
              CHECKOUT // STEP 01 OF 02
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-text-primary mt-1">
              DISPATCH & PAYMENT (DEMO)
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="p-6 bg-bg-elevated border border-border-subtle rounded space-y-4">
              <h2 className="text-xs font-system font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <span>1. CONTACT INFORMATION</span>
              </h2>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-system text-text-secondary">
                  EMAIL ADDRESS (FOR ORDER RECEIPT)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ronin@neo-tokyo.io"
                  {...register("email")}
                  className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                />
                {errors.email && (
                  <p className="text-[11px] text-accent-danger font-system">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 bg-bg-elevated border border-border-subtle rounded space-y-4">
              <h2 className="text-xs font-system font-bold uppercase tracking-wider text-text-primary">
                2. SHIPPING DESTINATION
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-system text-text-secondary">
                    FULL RECIPIENT NAME
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Kenji Sato"
                    {...register("fullName")}
                    className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-accent-danger font-system">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address1" className="text-xs font-system text-text-secondary">
                    STREET ADDRESS
                  </Label>
                  <Input
                    id="address1"
                    placeholder="42 Cyberpunk Ave"
                    {...register("address1")}
                    className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                  />
                  {errors.address1 && (
                    <p className="text-[11px] text-accent-danger font-system">{errors.address1.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs font-system text-text-secondary">
                      CITY / SUBURB
                    </Label>
                    <Input
                      id="city"
                      placeholder="Melbourne"
                      {...register("city")}
                      className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                    />
                    {errors.city && (
                      <p className="text-[11px] text-accent-danger font-system">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-xs font-system text-text-secondary">
                      STATE / REGION
                    </Label>
                    <Input
                      id="state"
                      placeholder="VIC"
                      {...register("state")}
                      className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                    />
                    {errors.state && (
                      <p className="text-[11px] text-accent-danger font-system">{errors.state.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="postcode" className="text-xs font-system text-text-secondary">
                      POSTCODE
                    </Label>
                    <Input
                      id="postcode"
                      placeholder="3000"
                      {...register("postcode")}
                      className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                    />
                    {errors.postcode && (
                      <p className="text-[11px] text-accent-danger font-system">{errors.postcode.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="country" className="text-xs font-system text-text-secondary">
                      COUNTRY
                    </Label>
                    <Input
                      id="country"
                      placeholder="Australia"
                      {...register("country")}
                      className="bg-bg-elevated-2 border-border-strong text-text-primary text-xs font-mono"
                    />
                    {errors.country && (
                      <p className="text-[11px] text-accent-danger font-system">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method (Simulation Mode) */}
            <div className="p-6 bg-bg-elevated border border-border-subtle rounded space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-system font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-accent-flame" />
                  <span>3. PAYMENT (SIMULATED PROTOTYPE)</span>
                </h2>
                <span className="text-[10px] font-system bg-accent-flame/20 text-accent-flame px-2 py-0.5 rounded font-bold">
                  TEST MODE ACTIVE
                </span>
              </div>

              <div className="p-4 bg-bg-elevated-2 border border-border-strong rounded text-xs space-y-2">
                <div className="flex items-center gap-2 text-text-primary font-bold">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>NO REAL CHARGES WILL BE PROCESSED</span>
                </div>
                <p className="text-text-secondary text-[11px] leading-relaxed">
                  This checkout is part of the ZENJI front-end design assessment. Clicking below simulates instant order placement without requiring card credentials.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-text-primary text-bg-primary hover:bg-neutral-200 font-bold uppercase tracking-wider h-14 text-xs font-system flex items-center justify-center gap-2 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-accent-flame" />
                    <span>{processingStep}</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRM & PLACE SIMULATED ORDER ({formatCurrency(total)})</span>
                    <span>&rarr;</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-bg-elevated border border-border-subtle rounded sticky top-24 space-y-6">
            <h2 className="text-xs font-system font-bold uppercase tracking-wider text-text-primary pb-4 border-b border-border-subtle">
              ORDER SUMMARY ({state.items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS)
            </h2>

            {/* Line items */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {enrichedItems.map((item) => (
                <div key={`${item.slug}-${item.size}`} className="flex gap-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-bg-elevated-2 border border-border-subtle rounded shrink-0 overflow-hidden">
                      <Image
                        src={item.product?.frontImage ?? ""}
                        alt={item.product?.name ?? item.slug}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-text-primary line-clamp-1">
                        {item.product?.name ?? item.slug}
                      </h4>
                      <p className="text-[10px] font-system text-text-tertiary">
                        SIZE: {item.size} &bull; QTY: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-text-primary">
                    {formatCurrency(item.priceAtAdd * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing totals breakdown */}
            <div className="pt-4 border-t border-border-subtle space-y-2 text-xs font-system">
              <div className="flex justify-between text-text-secondary">
                <span>SUBTOTAL</span>
                <span className="font-mono text-text-primary">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>EXPRESS DISPATCH (AU)</span>
                <span className="font-mono text-text-primary">
                  {shipping === 0 ? (
                    <span className="text-success font-bold">FREE</span>
                  ) : (
                    formatCurrency(shipping)
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-border-subtle flex justify-between text-sm font-bold text-text-primary">
                <span>TOTAL (AUD)</span>
                <span className="font-mono text-accent-flame text-base">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
