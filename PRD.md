# PRD.md — ZENJI Anime Streetwear (Prototype)

## 1. Overview

**Project:** ZENJI — anime-inspired streetwear brand website
**Type:** Front-end prototype / design-and-motion assessment (no real commerce)
**Reference:** https://zenji.shop/
**Goal:** Rebuild the ZENJI experience 1:1 in look, feel, and motion — hero video, marquee ticker, product grids, PDP, lookbook, checkout flow — using fake data and a simulated order-confirmation flow instead of real payments.

### 1.1 What this is
A visually faithful, heavily-animated clone of the ZENJI storefront that demonstrates front-end engineering + motion design skill. Every page a visitor could reach on the real site should exist here in some form, but all "commerce" is theatre: adding to cart, entering shipping info, and placing an order all work end-to-end in the UI, nothing is charged, nothing is persisted to a server, and no account system talks to a real backend.

### 1.2 What this is explicitly NOT
- Not a real payment integration (no Stripe/PayPal, no card processing).
- Not backed by a database — all product data is static/local (JSON/TS constants).
- Not a real auth system — "login" is either omitted or a cosmetic stub.
- Not multi-tenant, not an admin panel, not an inventory system.

Reducing scope here is intentional: the assessment is judged on **design fidelity + animation quality + code architecture**, not on e-commerce completeness.

---

## 2. Goals & Success Criteria

| Goal | Success looks like |
|---|---|
| Visual fidelity | Side-by-side with zenji.shop, typography, spacing, color, and imagery treatment feel like the same brand |
| Motion fidelity | Every animated moment on the reference (marquee, hero video overlay, scroll reveals, hover states, page transitions, cart drawer, quick view modal) has an equivalent, smooth (60fps-targeted) implementation |
| Functional prototype flow | A visitor can: browse drop → open product → pick size → add to cart → open cart drawer → go to checkout → fill shipping (fake) → confirm order → see an order-confirmed screen with a fake order number |
| Simplicity | No backend, no DB, no real payments; state lives in the browser (React context + optional `localStorage` persistence for the cart only) |
| Performance | Lighthouse Performance ≥ 85 on desktop despite heavy motion (via lazy-loading, `will-change` hygiene, reduced-motion support) |

---

## 3. Target Users / Personas

- **The assessor/reviewer** — primary actual audience; cares about code quality, animation polish, responsiveness, and attention to detail.
- **Simulated end customer persona** — Gen-Z/millennial anime + streetwear fan, mobile-first browsing habits, drawn in by bold visuals and drop-culture urgency ("limited stock", "no restocks").

---

## 4. Site Map / Pages

| Route | Purpose | Priority |
|---|---|---|
| `/` | Home — hero video, brand intro, sale rail, latest drops grid, ethos/manifesto section, footer | P0 |
| `/drop` | All current drop products, grid, filter/sort (cosmetic) | P0 |
| `/drop/[slug]` | Product detail page (PDP): gallery, size selector, add-to-cart, details accordion | P0 |
| `/collection` | Full catalog / collection grid (same card component as drop) | P1 |
| `/lookbook` | Editorial masonry gallery with tab filters (All/Front/Back/On Model) | P1 |
| `/our-story` | Brand story / manifesto long-form page | P1 |
| `/cart` (or drawer-only) | Cart drawer (slide-over) reachable from every page | P0 |
| `/checkout` | Fake shipping + "payment" form | P0 |
| `/order-confirmed` | Order confirmation screen with generated order ID and summary | P0 |
| `/faq`, `/contact`, `/privacy-policy`, `/terms`, `/return-policy` | Static legal/info pages, low-fidelity content, reuse a simple template | P2 |
| `/login` | Cosmetic-only auth screen (no real session) — optional, can be a styled "coming soon" | P3 |

P0 = required for MVP demo. P1 = required for full assessment scope. P2/P3 = stretch/time-permitting.

---

## 5. Core Features (Functional Requirements)

### 5.1 Global
- FR1: Sticky header with logo, nav links, search (UI-only or simple client-side filter), cart icon with live item-count badge, mobile hamburger menu.
- FR2: Infinite/looping announcement marquee ticker directly under the header (duplicated content track for seamless loop).
- FR3: Cart drawer accessible globally, slides in from the right, shows line items, quantity steppers, subtotal, and CTA to checkout.
- FR4: Footer with brand blurb, sitemap columns, social links, legal links — identical on every page.
- FR5: Global toast/notification on "Added to cart".
- FR6: Respect `prefers-reduced-motion` — all decorative animation must degrade gracefully to simple fades or be disabled.

### 5.2 Home Page
- FR7: Full-bleed hero video/background with headline, kicker text, and primary CTA ("SHOP THE DROP").
- FR8: Brand story/about section with intro copy + supporting image, scroll-triggered reveal.
- FR9: "Sale" horizontal/rail section pulling products flagged `onSale: true`.
- FR10: "Latest Drops" grid (product cards with front/back image swap on hover, sale badge, quick-view trigger).
- FR11: Manifesto/ethos full-width section with background image + overlay text.
- FR12: Newsletter or "Follow the Lore" social CTA block above the footer (optional form, no real submission — just success state).

### 5.3 Product Card (shared component)
- FR13: Shows front image by default; on hover (desktop) / on view (mobile) crossfades to back image.
- FR14: Sale badge ("SALE 15% OFF") when applicable, strikethrough original price + sale price.
- FR15: "Quick View →" opens a modal with size selection + add-to-cart without leaving the grid.
- FR16: Clicking the card (outside quick view control) navigates to the PDP.

### 5.4 Drop / Collection Pages
- FR17: Responsive grid of product cards (reuse shared component).
- FR18: Cosmetic filter/sort bar (by newest, price, sale) — sorts the static in-memory array client-side.
- FR19: Empty/loading skeleton state for grid (simulated short delay to show shimmer skeletons — pure UX polish, no real fetch latency needed but should feel real).

### 5.5 Product Detail Page (PDP)
- FR20: Image gallery: main image + thumbnail rail; supports click-to-swap and swipe on mobile; "scroll to browse" vertical stack option on desktop as seen on reference.
- FR21: Product title, colorway, price (with sale strike-through if applicable), stock status dot.
- FR22: Size selector (XS–XXL) as pill/button group; disallow add-to-cart until a size is picked, inline validation message ("SELECT A SIZE").
- FR23: Add to Cart CTA — triggers cart drawer open + toast + button micro-animation (e.g., brief loading/success morph).
- FR24: Wishlist heart toggle (local state only, optional persistence, no backend).
- FR25: Expandable accordion sections: Product Details, Size Guide, Shipping & Returns (static copy).
- FR26: SKU display, "IN STOCK" indicator.
- FR27: Related/"you may also like" strip at bottom (optional, P2).

### 5.6 Lookbook
- FR28: Masonry/grid editorial gallery of images tagged by garment + view (front/back/on-model).
- FR29: Filter tabs (All / Front / Back / On Model) — instant client-side filter with animated grid re-flow (FLIP-style).
- FR30: Each image links through to its PDP.

### 5.7 Cart & Checkout (the "commerce" simulation)
- FR31: Cart state (items, sizes, qty, price) held in React Context + `localStorage`, so a refresh doesn't lose the cart (nice-to-have, not required).
- FR32: Cart drawer: increment/decrement qty, remove item, subtotal, free-shipping threshold progress bar (e.g., "Add A$X more for free shipping").
- FR33: Checkout page collects: contact email, shipping address (name, address, city, state, postcode, country — Australia-focused, matching reference), and a **fake payment step** (e.g., a static "Payment (Demo Mode)" card-style form that does not validate a real card, or simply a "Simulate Payment" button so it's explicit this is fake).
- FR34: Order summary sidebar recalculates as user edits cart from checkout.
- FR35: "Place Order" button → shows a short processing/loading animation (2–3s skeleton/spinner sequence for realism) → navigates to Order Confirmed screen.
- FR36: Order Confirmed page: generated order number (e.g., `ZNJ-XXXXXX`), order summary, delivery estimate copy, "Continue Shopping" CTA. Cart is cleared after confirmation.
- FR37: No real network call, no real PII storage beyond the current browser session; a note in the footer of checkout ("This is a demo checkout — no payment will be processed") is acceptable and honest, but should be styled in-brand rather than looking like a disclaimer banner if that breaks immersion — placement is a design decision (see design.md).

### 5.8 Explicitly Out of Scope
- Real payment gateways, real order persistence/database, real user accounts/auth, email sending, inventory management, admin dashboard, real search backend/indexing, CMS integration, multi-currency/tax logic beyond display.

---

## 6. Non-Functional Requirements

- **NFR1 Performance:** Video hero must have a poster image fallback and lazy-load below-the-fold media; animations use GPU-friendly properties (`transform`, `opacity`) only.
- **NFR2 Responsiveness:** Fully responsive from 360px to 1920px+; mobile nav, mobile PDP gallery (swipeable), mobile cart drawer full-height.
- **NFR3 Accessibility:** Semantic HTML, focus states, `alt` text on all product imagery, keyboard-operable cart/menu/modals, `aria-live` for cart updates, honors reduced-motion.
- **NFR4 Browser support:** Latest 2 versions of Chrome, Safari, Firefox, Edge; mobile Safari/Chrome.
- **NFR5 Code quality:** Componentized, typed (TypeScript), documented, lint-clean.
- **NFR6 No backend dependency:** App must run fully as a static/client app (deployable to Vercel/Netlify with zero server env vars required).

---

## 7. Content & Data Requirements

All product, drop, and lookbook data lives in a local, typed data file (`data/products.ts`), modeled closely on the reference catalog (names, price points ~A$39.99, sale price ~A$33.99 at 15% off, colorways, SKUs). Copy (manifesto, about, FAQ) is paraphrased/original text inspired by the reference's tone (samurai/anime/streetwear voice) — not copied verbatim.

---

## 8. Assumptions & Constraints

- Images: either sourced from free stock/AI-generated placeholders styled to match mood (dark, moody, anime-graphic tee mockups) or clearly-labeled placeholder art, since original ZENJI product photography is proprietary and must not be reused.
- Fonts/exact copy: recreate the *style* (bold condensed display type, glitch/system-terminal accent labels like "System // ZENJI") rather than lifting proprietary brand assets.
- Single "drop"/collection dataset (~10 products) is sufficient to demonstrate all UI states (in stock, on sale, sold out).
- One currency (AUD) and one region (Australia-flavored copy) to match reference tone.

---

## 9. Milestones
See `phases.md` for the phased build plan and `architecture.md` / `design.md` for technical and visual specs.
