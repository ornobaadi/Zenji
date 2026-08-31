# phases.md — ZENJI Prototype Build Plan

Order matters here: structure and content are built **before** animation is layered on, because animating a moving target wastes time. Within each phase, "static/functional first, then motion pass" is the rule.

---

## Phase 0 — Setup & Foundations
**Goal:** project scaffolding, design tokens, no real pages yet.

- Init Next.js + TypeScript + Tailwind project.
- Install GSAP, Framer Motion, lucide-react, React Hook Form + Zod.
- Set up `globals.css` with design tokens (color vars, type scale, spacing scale — see `design.md`).
- Load and configure fonts (display headline font + condensed/mono accent font).
- Build `types/index.ts` data models.
- Author `data/products.ts` with ~10 fake products (name, price, sale flag, sizes, description) modeled on the reference catalog structure.
- Set up base layout shell (`app/layout.tsx`) with placeholder Header/Footer (no styling polish yet).

**Exit criteria:** app boots, routes resolve, typed dummy data renders as plain text.

---

## Phase 1 — Static Structure & Content (no animation)
**Goal:** every page exists with real layout and real (fake) content, fully responsive, zero motion beyond browser defaults.

1. **Global chrome:** Header (logo, nav, search icon, cart icon w/ badge, mobile menu), Marquee ticker (static, no scroll yet), Footer (4-column link grid + socials + legal strip).
2. **Home:** Hero section (video/image + headline + CTA, no scroll fx yet), About/brand section, Sale rail, Latest Drops grid, Ethos/manifesto section.
3. **Product card component:** static front image, price, sale badge — no hover swap yet.
4. **Drop & Collection pages:** grid of product cards, cosmetic sort/filter bar (functional sorting, no transition polish).
5. **PDP:** gallery (click-to-swap, no crossfade animation), size selector, add-to-cart button (functional, adds to cart state), accordions (functional expand/collapse, no easing polish).
6. **Lookbook:** grid of images with filter tabs (functional filter, instant show/hide — no FLIP yet).
7. **Our Story + legal/info pages:** long-form static content pages.
8. **Cart drawer:** functional open/close, line items, qty controls, subtotal — instant show/hide, no slide transition yet.
9. **Checkout:** shipping form with Zod validation, order summary sidebar, fake "Simulate Payment" step.
10. **Order confirmed page:** displays generated order ID + summary; cart clears on arrival.

**Exit criteria:** a reviewer can click through the *entire* funnel (browse → PDP → cart → checkout → confirmation) with correct data and no dead links, on both desktop and mobile widths — it just looks static/flat still.

---

## Phase 2 — Design & Visual Polish
**Goal:** match the reference's aesthetic exactly: dark theme, imagery treatment, typography rhythm, spacing, iconography, badges, borders.

- Apply full design system from `design.md` (color, type, spacing, borders, buttons, badges).
- Image treatment: consistent aspect ratios, subtle grain/overlay if used, hover states (before adding actual animated transitions).
- Refine component visual states: default / hover / active / disabled / sold-out.
- Build empty/skeleton/loading states (shimmer skeleton for grids).
- Responsive pass #2: tablet breakpoints, edge cases (long product names, 6-digit prices, empty cart state, empty wishlist).

**Exit criteria:** static screenshots of key pages are visually close to zenji.shop at matching viewport sizes.

---

## Phase 3 — Motion & Animation Layer
**Goal:** this is the heart of the assessment — every interactive/scroll moment gets real motion.

Work through these in order of visibility/impact:

1. **Marquee ticker:** true seamless infinite scroll loop (GSAP, duplicated track, linear easing, pause-on-hover optional).
2. **Header behavior:** shrink/blur-on-scroll, hide-on-scroll-down/show-on-scroll-up (optional nice-to-have).
3. **Hero:** entrance timeline (headline chars/words stagger in, CTA fades up, subtle scale/parallax on the video as user scrolls past).
4. **Scroll reveals:** GSAP ScrollTrigger fade/slide-up stagger for About, Sale rail, Latest Drops grid cards, Ethos section (batch stagger by row).
5. **Product card hover:** front→back image crossfade (Framer `AnimatePresence`/opacity swap), subtle scale on hover, badge micro-motion.
6. **Quick View modal:** scale+fade in from the triggering card, backdrop blur fade, exit reverses.
7. **Cart drawer:** real slide-in from right with spring easing, backdrop fade, item add/remove animate height+opacity (`layout` prop), toast on add.
8. **PDP gallery:** crossfade/slide between images, thumbnail active-state indicator animates, pinned "scroll to browse" behavior on desktop matching reference feel.
9. **Size selector & CTA:** pill press micro-interaction, shake/pulse validation state when no size chosen, Add-to-Cart button success morph (icon swap / brief checkmark) before drawer opens.
10. **Lookbook filter:** animated grid re-flow using FLIP/`layout` when switching tabs, image stagger-in.
11. **Page transitions:** subtle route-level fade/slide via `AnimatePresence` in the root layout template.
12. **Checkout → Order Confirmed:** "processing" loading sequence (progress/spinner animation ~2s), confirmation page entrance (success check-mark draw-in, order details stagger-in, confetti-lite or glow accent optional).
13. **Reduced motion pass:** verify every animation above degrades to a simple fade or is skipped under `prefers-reduced-motion`.

**Exit criteria:** side-by-side video comparison against zenji.shop shows equivalent motion coverage; no dropped frames on a mid-tier laptop/phone; nothing animates in a way that blocks interaction (no unskippable multi-second intros).

---

## Phase 4 — Cart, Checkout & "Order Confirmed" Logic Hardening
**Goal:** make the fake commerce flow feel trustworthy and bug-free, since it's the functional centerpiece.

- LocalStorage persistence + hydration edge cases (SSR mismatch guards).
- Price math correctness (sale price, quantity, free-shipping threshold banner logic).
- Form validation messaging (inline errors, disabled submit until valid).
- Order number generator uniqueness within a session.
- Clear, honest "demo checkout" microcopy that fits the brand voice instead of a jarring disclaimer.
- Handle back-button/refresh behavior gracefully on `/order-confirmed` (don't crash if a user lands there with no order in session — redirect home).

**Exit criteria:** the full purchase flow can be repeated multiple times in a row without stale state, console errors, or broken totals.

---

## Phase 5 — QA, Accessibility & Performance Pass
**Goal:** ship-ready polish.

- Cross-browser check (Chrome, Safari, Firefox, Edge) + iOS Safari/Android Chrome.
- Keyboard navigation through header, modals, drawer, forms; visible focus states.
- `aria-live` region for cart-count changes; alt text audit.
- Lighthouse pass (Performance/Accessibility/Best Practices) on Home and PDP — address anything under target thresholds.
- Manual regression checklist re-run of the full funnel from Phase 1.
- Final content proofread (no lorem ipsum left, consistent pricing/currency formatting).

**Exit criteria:** ready to present/demo.

---

## Phase 6 — Deployment & Handover
**Goal:** publicly viewable link + documentation.

- Deploy to Vercel (or static export to Netlify/GitHub Pages).
- Verify environment needs zero secrets/env vars (confirms "no backend" requirement).
- Write a short `README.md`: setup instructions, tech stack summary, known limitations (fake checkout, no persistence beyond localStorage cart, no real payments), and a link back to this doc set.

**Exit criteria:** a reviewer can open a live URL, click through the whole funnel, and understand from the README exactly what is and isn't real.

---

## Suggested Time Allocation (rough, adjust to your schedule)

| Phase | % of total effort |
|---|---|
| 0 — Setup | 5% |
| 1 — Static structure | 20% |
| 2 — Visual polish | 20% |
| 3 — Motion layer | 30% |
| 4 — Commerce logic | 10% |
| 5 — QA/perf/a11y | 10% |
| 6 — Deploy | 5% |

Motion (Phase 3) is intentionally the largest single line item — it's the differentiator this assessment is explicitly grading on.
