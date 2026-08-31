import { CartItem, Order, ShippingAddress } from "@/types";
import { calculateShipping, calculateSubtotal, calculateTotal } from "./pricing";

export function generateOrderId(): string {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `ZNJ-${randomSuffix}`;
}

export function createOrderSnapshot(items: CartItem[], shippingAddress: ShippingAddress): Order {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal);

  return {
    id: generateOrderId(),
    items: [...items],
    subtotal,
    shipping,
    total,
    shippingAddress,
    createdAt: new Date().toISOString(),
  };
}
