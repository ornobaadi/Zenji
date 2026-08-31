import { CartItem } from "@/types";

export const FREE_SHIPPING_THRESHOLD = 100.0;
export const STANDARD_SHIPPING_COST = 10.0;

export function formatCurrency(amount: number): string {
  return `A$${amount.toFixed(2)}`;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.priceAtAdd * item.quantity, 0);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
}

export function calculateTotal(subtotal: number): number {
  return subtotal + calculateShipping(subtotal);
}

export function getFreeShippingProgress(subtotal: number): {
  progress: number;
  remaining: number;
  isFree: boolean;
} {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return {
    progress,
    remaining,
    isFree: remaining === 0,
  };
}
