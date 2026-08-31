export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  slug: string;
  name: string;
  colorway: string;
  price: number; // base price, e.g. 39.99
  salePrice?: number; // present if on sale, e.g. 33.99
  onSale: boolean;
  inStock: boolean;
  sizes: Size[];
  images: string[]; // ordered gallery images
  frontImage: string; // used in card default state
  backImage: string; // used in card hover state
  description: string;
  details: string[]; // bullet list for "Product Details"
  sku: string;
  collection: string; // e.g. "THE_ORIGIN_DROP"
  tag?: "NEW_ARRIVAL" | "LIMITED" | "SEASON_01";
}

export interface CartItem {
  slug: string;
  size: Size;
  quantity: number;
  priceAtAdd: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Order {
  id: string; // e.g. "ZNJ-482913"
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface LookbookEntry {
  id: string;
  productSlug: string;
  productName: string;
  view: "FRONT" | "BACK" | "ON_MODEL";
  image: string;
  tag?: "NEW_ARRIVAL" | "LIMITED" | "SEASON_01";
}
