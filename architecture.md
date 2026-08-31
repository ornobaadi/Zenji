# architecture.md — ZENJI Prototype

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | File-based routing matches the reference's URL structure (`/drop/[slug]`), built-in image optimization, easy static export/deploy, RSC where it helps (static content) + client components for interactivity |
| Language | **TypeScript** | Type-safe product/cart models, fewer runtime bugs, better DX |
| Styling | **Tailwind CSS** + small set of global CSS vars | Fast iteration on a highly custom dark aesthetic; CSS vars for theme tokens (see design.md) so animation code and Tailwind stay in sync |
| Animation (scroll/timeline) | **GSAP + ScrollTrigger** | Best tool for scroll-linked reveals, pinning, marquee loops, and complex timelines like the reference site clearly uses |
| Animation (component/UI state) | **Framer Motion (motion/react)** | Ideal for React-state-driven transitions: modal/drawer enter-exit, layout animations (`layoutId`) for image hover swap and lookbook filter re-flow, page transitions |
| State management | **React Context + `useReducer`** for cart; local component state elsewhere | Cart is the only cross-page shared state; no need for Redux/Zustand at this scope, but Zustand is an acceptable swap if preferred for simpler selector ergonomics |
| Persistence | **`localStorage`** (cart only, optional) | No backend/DB per requirements; localStorage gives "your cart survives a refresh" realism at zero infra cost |
| Data | **Static typed data module** (`/data/products.ts`, `/data/lookbook.ts`) | No DB needed; arrays of typed objects act as the "catalog" |
| Icons | **lucide-react** | Lightweight, consistent line-icon set for cart/search/menu/heart |
| Forms | **React Hook Form** (+ Zod for schema validation) | Clean validation for checkout's shipping form without heavy overhead |
| Deployment | **Vercel** (static/SSG export works too) | Zero-config for Next.js, free tier is enough for a prototype |

No backend service, no ORM, no database, no auth provider. This app can be fully statically generated (`next build && next export` or Vercel's default static optimization for pages with no server data needs).

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────┐
│                Browser (Client)              │
│                                               │
│  Next.js App (Static/SSG pages)              │
│   ├─ Layout: Header, Marquee, Footer, Cart   │
│   │   Drawer (persist across route changes)  │
│   ├─ Pages (App Router)                      │
│   │   ├─ /               Home                │
│   │   ├─ /drop            Drop grid          │
│   │   ├─ /drop/[slug]     PDP                │
│   │   ├─ /collection      Collection grid    │
│   │   ├─ /lookbook        Editorial gallery  │
│   │   ├─ /our-story       Long-form page     │
│   │   ├─ /checkout        Fake checkout      │
│   │   ├─ /order-confirmed Confirmation       │
│   │   └─ /faq /contact /… Static info pages  │
│   │                                           │
│   ├─ Context: CartProvider (useReducer)      │
│   │    → reads/writes localStorage           │
│   │                                           │
│   ├─ Data layer: /data/*.ts (static arrays)  │
│   │                                           │
│   └─ Animation layer:                        │
│        GSAP/ScrollTrigger (scroll reveals,   │
│        marquee, pin sections)                │
│        Framer Motion (drawers, modals,       │
│        hover/layout transitions, page fx)    │
└─────────────────────────────────────────────┘

No network calls to any first-party backend.
Optional: fetch() to a public placeholder-image
CDN or bundled local assets only.
```

There is no server component that talks to a database, no API routes needed except **optionally** a trivial `/api/checkout` route that just echoes back a fake order object (useful only if you want to simulate "network latency" realistically — otherwise this can be done entirely client-side with a `setTimeout`).

---

## 3. Folder Structure

```
zenji/
├─ app/
│  ├─ layout.tsx                 # Root layout: fonts, providers, Header, Marquee, Footer
│  ├─ page.tsx                   # Home
│  ├─ globals.css                # Tailwind base + CSS variables (design tokens)
│  ├─ drop/
│  │  ├─ page.tsx                # Drop grid
│  │  └─ [slug]/page.tsx         # PDP
│  ├─ collection/page.tsx
│  ├─ lookbook/page.tsx
│  ├─ our-story/page.tsx
│  ├─ checkout/page.tsx
│  ├─ order-confirmed/page.tsx
│  ├─ faq/page.tsx
│  ├─ contact/page.tsx
│  ├─ privacy-policy/page.tsx
│  ├─ terms/page.tsx
│  ├─ return-policy/page.tsx
│  └─ login/page.tsx             # cosmetic only
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx
│  │  ├─ Marquee.tsx
│  │  ├─ MobileNav.tsx
│  │  ├─ CartDrawer.tsx
│  │  └─ Footer.tsx
│  ├─ product/
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductGrid.tsx
│  │  ├─ QuickViewModal.tsx
│  │  ├─ SizeSelector.tsx
│  │  ├─ Gallery.tsx
│  │  └─ Accordion.tsx
│  ├─ home/
│  │  ├─ Hero.tsx
│  │  ├─ AboutSection.tsx
│  │  ├─ SaleRail.tsx
│  │  ├─ LatestDrops.tsx
│  │  └─ EthosSection.tsx
│  ├─ lookbook/
│  │  ├─ LookbookGrid.tsx
│  │  └─ FilterTabs.tsx
│  ├─ checkout/
│  │  ├─ ShippingForm.tsx
│  │  ├─ FakePaymentStep.tsx
│  │  ├─ OrderSummary.tsx
│  │  └─ ProcessingOverlay.tsx
│  └─ ui/                        # buttons, badges, toasts, skeletons, dividers
│
├─ context/
│  └─ CartContext.tsx            # useReducer + localStorage sync
│
├─ data/
│  ├─ products.ts                # typed product catalog
│  ├─ lookbook.ts                # lookbook image entries
│  └─ content.ts                 # static copy: manifesto, FAQ, footer links
│
├─ lib/
│  ├─ animations.ts              # shared GSAP timelines/helpers, Framer variants
│  ├─ pricing.ts                 # sale-price/subtotal/shipping-threshold math
│  ├─ order.ts                   # fake order-number generator
│  └─ utils.ts
│
├─ hooks/
│  ├─ useReducedMotion.ts
│  ├─ useScrollReveal.ts
│  └─ useCart.ts                 # convenience hook over CartContext
│
├─ types/
│  └─ index.ts                   # Product, CartItem, Order, LookbookEntry types
│
└─ public/
   ├─ videos/hero.mp4
   └─ images/…
```

---

## 4. Data Model (TypeScript types)

```ts
// types/index.ts

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  slug: string;
  name: string;
  colorway: string;
  price: number;          // base price, e.g. 39.99
  salePrice?: number;     // present if on sale, e.g. 33.99
  onSale: boolean;
  inStock: boolean;
  sizes: Size[];
  images: string[];       // ordered gallery images
  frontImage: string;     // used in card default state
  backImage: string;      // used in card hover state
  description: string;
  details: string[];      // bullet list for "Product Details"
  sku: string;
  collection: string;     // e.g. "THE_ORIGIN_DROP"
  tag?: "NEW_ARRIVAL" | "LIMITED" | "SEASON_01";
}

export interface CartItem {
  slug: string;
  size: Size;
  quantity: number;
  // priceAtAdd snapshot avoids surprises if catalog data changes at runtime
  priceAtAdd: number;
}

export interface Order {
  id: string;             // e.g. "ZNJ-482913"
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  createdAt: string;
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

export interface LookbookEntry {
  productSlug: string;
  productName: string;
  view: "FRONT" | "BACK" | "ON_MODEL";
  image: string;
  tag?: "NEW_ARRIVAL" | "LIMITED" | "SEASON_01";
}
```

---

## 5. State Management

**Cart** is the only piece of state that must survive route changes, so it's lifted to a context provider wrapping the whole app in `app/layout.tsx`.

```ts
// context/CartContext.tsx (shape)
interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; slug: string; size: Size }
  | { type: "UPDATE_QTY"; slug: string; size: Size; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; items: CartItem[] }; // from localStorage on mount
```

- On mount, `HYDRATE` reads `localStorage.getItem("zenji_cart")`.
- On every change, an effect writes the serialized cart back to `localStorage`.
- `CLEAR_CART` fires after a successful fake order placement.

Everything else (wishlist toggle, accordion open/closed, filter tab, quick-view modal open) is local `useState` inside the relevant component — no need to globalize it.

**Checkout flow state** (shipping form values, "processing" boolean) lives locally in `/checkout/page.tsx`; on submit it:
1. Validates the shipping form (Zod schema).
2. Sets `isProcessing = true`, shows `ProcessingOverlay` for ~2s (simulated).
3. Generates a fake `Order` object via `lib/order.ts` (random ID, snapshot of cart + totals).
4. Stores that order transiently (e.g., in `sessionStorage` or passed via router state/query) so `/order-confirmed` can render it.
5. Dispatches `CLEAR_CART`.
6. Routes to `/order-confirmed`.

---

## 6. Animation Architecture

Two motion libraries are used for two different jobs — don't mix their responsibilities:

- **GSAP + ScrollTrigger** → anything tied to scroll position or that needs a fine-grained timeline: the infinite marquee ticker, hero parallax/scale-on-scroll, section-by-section fade/slide-up reveals, pinned sections (e.g., "ethos" full-bleed section), stagger-in of grid cards as they enter viewport.
- **Framer Motion** → anything tied to React component state/lifecycle: cart drawer slide-in/out, quick-view modal open/close, page-to-page transitions (`AnimatePresence` around route content), product card image crossfade on hover using `layoutId`/`AnimatePresence`, lookbook filter re-flow (`layout` prop for FLIP animation), button micro-interactions, toast notifications.

A single `lib/animations.ts` exports:
- Reusable GSAP timeline factories (`createMarqueeTimeline`, `createRevealTimeline`).
- Shared Framer Motion `variants` objects (`fadeUp`, `drawerSlide`, `modalScale`, `staggerContainer`) so easing/duration values stay consistent site-wide (single source of truth for the "motion language" defined in design.md).

All animation hooks check `useReducedMotion()` first and either skip GSAP triggers entirely or swap Framer variants for near-instant opacity fades.

---

## 7. Routing & Rendering Strategy

- Static/catalog pages (`/`, `/drop`, `/collection`, `/lookbook`, `/our-story`, legal pages) are statically generated at build time (SSG) — data comes from local TS modules, so this is trivial and fast.
- PDP (`/drop/[slug]`) uses `generateStaticParams` to pre-render one page per product from `data/products.ts`.
- `/checkout` and `/order-confirmed` are client-rendered (they depend on cart/session state) but still ship no server logic.
- No middleware, no server actions required (no data mutation on a server) — an optional server action for `/api/checkout` can be added purely for the *feel* of a real request-response cycle, but it's not required by the requirements (no DB, no real payment).

---

## 8. Performance Considerations

- Hero video: compressed `.mp4`/`.webm`, `preload="metadata"`, poster frame image, `muted autoplay loop playsinline`.
- Product images: Next `<Image>` with responsive `sizes`, blur placeholder.
- GSAP ScrollTriggers are created inside `useEffect`/`useGSAP` and properly `.revert()`ed on unmount to avoid leaks across client-side navigations.
- Code-split heavy modal/drawer components with `next/dynamic` where it helps first-load JS size.
- Avoid animating layout-triggering CSS properties; stick to `transform`/`opacity`.

---

## 9. Testing Strategy (lightweight, appropriate for a prototype)

- Type-checking via `tsc --noEmit` as a CI gate.
- A handful of component tests (Vitest + React Testing Library) for: cart reducer logic, price/subtotal math, size-selection validation, order-number generator.
- Manual QA checklist (see phases.md Phase 5) rather than full e2e suite, given assessment scope.
