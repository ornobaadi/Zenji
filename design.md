# design.md — ZENJI Design System & Motion Spec

Reference: https://zenji.shop/ — dark, cinematic, anime-meets-streetwear-meets-terminal aesthetic. This doc defines the visual language and exact motion behavior so implementation matches the reference without guesswork.

---

## 1. Brand Voice / Visual Mood

- **Neo-Tokyo / cyber-samurai** meets **Australian streetwear**: dark backgrounds, high-contrast type, kanji accents (力 = "power/strength"), terminal/system readouts ("System // ZENJI", "COLLECTION // THE_ORIGIN_DROP") layered over emotive anime-graphic apparel photography.
- Tone in copy: short, declarative, slightly mythic ("The warrior within refuses to fade into the crowd"), interspersed with tech/UI-style labels in monospace/uppercase tracking.
- Drop culture urgency: "LIMITED STOCK", "NO RESTOCKS. EVER." — scarcity and exclusivity baked into microcopy everywhere, including the footer tagline.

---

## 2. Color System

Use CSS custom properties in `globals.css`; Tailwind config maps to these.

```css
:root {
  --bg-primary:     #0a0a0a;   /* near-black base background */
  --bg-elevated:    #121212;   /* cards, drawers, modals */
  --bg-elevated-2:  #1a1a1a;   /* nested surfaces, input fields */
  --border-subtle:  #2a2a2a;   /* hairline dividers */
  --border-strong:  #3d3d3d;

  --text-primary:   #f5f5f2;   /* off-white, not pure white */
  --text-secondary: #a3a3a3;   /* muted grey body copy */
  --text-tertiary:  #6b6b6b;   /* captions, SKUs, timestamps */

  --accent-flame:   #3b7ce0;   /* electric/steel blue — hero accent, matches "Blue Flame" drop */
  --accent-danger:  #e0333b;   /* sale badges, "demon blood" red accent */
  --accent-warn:    #e0a83b;   /* limited/stock indicators if needed */

  --success:        #34d17a;   /* in-stock dot, order confirmed check */

  --overlay-scrim:  rgba(0,0,0,0.6);  /* image overlays for text legibility */
}
```

- Base palette is ~90% near-black/greyscale; color accents are used sparingly and intentionally (sale red, in-stock green dot, one signature accent blue) — never decorative gradients everywhere.
- Product photography should stay true-to-life; UI chrome stays monochrome so garments/graphics pop.

---

## 3. Typography

| Role | Style | Notes |
|---|---|---|
| Display / Hero headline | Bold, condensed, uppercase, tight tracking (e.g., a font like **Archivo Black**, **Anton**, or **Bebas Neue**) | Used for "WEAR YOUR STORY", section titles like "LATEST_DROPS" |
| System/label text | Uppercase, wide letter-spacing, monospace or semi-mono (e.g., **JetBrains Mono**, **Space Mono**) | Used for "System // ZENJI", SKU, "COLLECTION // THE_ORIGIN_DROP", nav "MORE ∨" |
| Body copy | Clean grotesk sans (e.g., **Inter**, **Neue Montreal**), regular weight | About/manifesto paragraphs, product descriptions |
| Price | Same body sans, medium weight, tabular-nums | Consistent alignment in cards/summaries |

Type scale (rem, mobile → desktop via `clamp()`):
- H1/hero: `clamp(2.5rem, 8vw, 6rem)`
- H2/section: `clamp(1.75rem, 4vw, 3rem)`
- H3/card title: `1rem–1.25rem`
- Body: `0.9375rem–1rem`
- Label/system text: `0.6875rem–0.75rem`, `letter-spacing: 0.08em–0.15em`

All headline/section titles are UPPERCASE by default per the reference (`LATEST_DROPS`, `THE ZENJI ETHOS`).

---

## 4. Spacing, Grid & Layout

- 8px base spacing unit; section vertical rhythm: `py-24` to `py-32` on desktop, `py-12` to `py-16` on mobile between major sections.
- Max content width: `1440px–1600px` for full-bleed sections; `1200px` inner container for text-constrained content (manifesto, FAQ).
- Product grids: 4 columns desktop → 2 columns tablet → 1–2 columns mobile (reference uses a dense grid at desktop, single-column horizontal-scroll or 2-col on mobile).
- Full-bleed sections (hero, ethos/manifesto) break out of the container to viewport width with an overlay scrim for text contrast.

---

## 5. Core Components — Visual Spec

### 5.1 Header
- Fixed/sticky, dark translucent background (`backdrop-filter: blur(12px)` + `bg-primary` at ~85% opacity) once scrolled.
- Left: wordmark "ZENJI" (+ small 力 kanji glyph accent, optionally animated — see motion spec).
- Center/right: nav links (`DROP`, `COLLECTION`, `LOOKBOOK`, `OUR STORY`), `MORE ∨` overflow, search icon, cart icon with numeric badge, hamburger on mobile.
- Border-bottom hairline (`--border-subtle`) always visible.

### 5.2 Marquee Ticker
- Thin strip directly beneath header, `--bg-elevated` background, uppercase mono text, bullet-separated (` • `) repeating announcements.
- Full-width, edge-to-edge, no padding interruption — text runs infinitely.

### 5.3 Product Card
- Aspect-ratio locked image container (e.g., 3:4), `--bg-elevated` background while loading.
- Sale badge: small pill, top-left, `--accent-danger` background, white text, "SALE 15% OFF".
- Title: uppercase, small, below image; price row: strikethrough original + accent sale price when applicable.
- "QUICK VIEW →" as a subtle overlay button revealed on hover (desktop) or always-visible small link (mobile).

### 5.4 Buttons
- Primary CTA: solid `--text-primary` background with `--bg-primary` text (inverted/high-contrast "punch" button), uppercase, wide tracking, arrow suffix (`→`) common pattern from reference ("SHOP THE DROP →", "ADD TO CART →").
- Secondary/ghost: 1px border (`--border-strong`), transparent background, fills on hover.
- Disabled state: reduced opacity (~40%), no hover fx, cursor not-allowed.

### 5.5 Size Selector
- Row of square/pill buttons (XS–XXL); unselected = outline only; selected = filled inverted; sold-out sizes = struck-through/disabled with reduced opacity.

### 5.6 Cart Drawer
- Slides in from right, ~400–460px wide desktop / full-width mobile, `--bg-elevated` surface, drop shadow, backdrop scrim behind it.
- Header row: "YOUR CART" + close (×); line items with thumbnail, name, size, qty stepper, remove; footer: subtotal, free-shipping progress bar, "CHECKOUT →" button.

### 5.7 Badges/Tags
- `NEW_ARRIVAL`, `LIMITED`, `SEASON_01` — small uppercase mono pills, outline style, `--text-tertiary` border/text, used in lookbook and product tags.

---

## 6. Motion System — Principles

1. **Everything has a reason.** No animation for animation's sake — motion should either (a) guide attention to a state change, (b) reinforce brand tone (deliberate, controlled, "warrior discipline" — not bouncy/cartoonish), or (c) make scroll feel cinematic.
2. **Easing language:** primary ease = `cubic-bezier(0.16, 1, 0.3, 1)` ("expo-out" feel) for entrances; `cubic-bezier(0.7, 0, 0.84, 0)` for exits; avoid default linear except for the marquee (which should be linear/constant-speed).
3. **Duration bands:**
   - Micro-interactions (button hover, badge pulse): 120–200ms
   - Component transitions (modal, drawer, accordion): 300–500ms
   - Scroll reveals: 500–800ms per element, staggered 60–120ms apart in groups
   - Page-level/hero entrances: 800–1400ms total timeline
4. **Motion always respects `prefers-reduced-motion: reduce`** — swap to opacity-only fades ≤150ms or disable entirely (no parallax/pin/marquee scroll-jank for these users).
5. **Never block interaction.** No animation should prevent a user from clicking/scrolling once content is visually present (avoid pointer-events lockups during transitions).

---

## 7. Motion System — Per-Element Spec

### 7.1 Marquee Ticker
- Two duplicated content tracks placed side by side inside a flex container; animate `translateX(-50%)` continuously via GSAP `to()` with `repeat: -1, ease: "none", duration` scaled to text length for constant perceived speed (~40–60px/sec).
- Optional: pause animation on hover (`onMouseEnter` → `.pause()`).

### 7.2 Header
- On mount: logo + nav fade/slide down 12px → 0, 400ms, staggered 40ms per nav item.
- On scroll: background opacity/blur interpolates in over the first ~80px of scroll (ScrollTrigger scrub or simple scroll-listener threshold class toggle).

### 7.3 Hero
- Kicker text ("力 — Awakening") fades in first (200ms delay), then headline animates in via word/character stagger (split-text style: each word `y: 40 → 0, opacity: 0 → 1`, 500ms, stagger 60ms), then CTA button fades/slides up last.
- Background video: subtle continuous slow scale (`scale: 1 → 1.05` over 8–10s ease-in-out loop) for a living, cinematic feel; on scroll past hero, apply a gentle parallax (video moves slower than scroll, ~0.3x speed) via ScrollTrigger `scrub: true`.

### 7.4 Scroll Reveals (About, Sale rail, Latest Drops, Ethos)
- Each section's children enter with `opacity: 0, y: 32 → opacity: 1, y: 0`, ScrollTrigger `start: "top 80%"`, `once: true` (no re-trigger on scroll-back, keeps it calm).
- Grid cards: stagger children 60–100ms apart in row order using GSAP's `stagger` or Framer's `staggerChildren` in a parent variant.

### 7.5 Product Card Hover
- Front image opacity 1→0 while back image opacity 0→1, both `position: absolute` stacked, 250ms crossfade, no layout shift.
- Card container: subtle `scale: 1 → 1.02`, 300ms, plus a very light `box-shadow`/border brightening.
- "QUICK VIEW →" label: slides up from `translateY(8px)` + fade in, 200ms, synced with hover start.
- On touch devices: front/back swap triggers on scroll-into-view instead of hover, once, non-repeating (or simply omit and rely on tap → Quick View).

### 7.6 Quick View Modal
- Backdrop: fade 0→1 opacity, 250ms.
- Modal panel: `scale: 0.94 → 1` + `opacity: 0 → 1`, 300ms, expo-out ease; exits reverse at 200ms (faster out than in).
- Triggering element can optionally use a shared `layoutId` so the modal feels like it "grows" from the card image (nice-to-have polish).

### 7.7 Cart Drawer
- Slide in from `translateX(100%) → 0`, 350ms spring (`stiffness: 300, damping: 30` in Framer Motion), backdrop fades in parallel.
- Adding an item: new line item enters with height `0 → auto` + opacity fade (Framer `layout` + `AnimatePresence`), 250ms.
- Removing an item: reverse of the above, then remaining items animate to fill the gap via `layout`.
- Free-shipping progress bar: width animates smoothly (`transition: width 400ms ease-out`) whenever subtotal changes.

### 7.8 PDP Gallery
- Thumbnail click → main image crossfades (200ms) rather than hard-cuts; active thumbnail gets an animated underline/border indicator that slides between positions (`layoutId`).
- "SCROLL TO BROWSE ↕" affordance: small bounce/pulse loop (subtle, 1.5–2s cycle, `translateY` ±4px) to invite scrolling through a vertically stacked gallery on desktop.

### 7.9 Size Selector / Add to Cart
- Size pill selection: quick scale-pulse (`scale: 1 → 1.08 → 1`, 200ms) on the newly selected pill.
- Attempting Add to Cart with no size selected: the size-selector row does a short horizontal shake (`x: 0 → -6 → 6 → -4 → 4 → 0`, 400ms) plus an inline red validation label fades in.
- Successful Add to Cart: button content morphs — label swaps to a checkmark icon + "ADDED" text for ~900ms (crossfade), then reverts; cart drawer auto-opens with its own entrance timeline; a toast slides in from top-right simultaneously and auto-dismisses after ~2.5s.

### 7.10 Lookbook Filter
- Switching tabs (All/Front/Back/On Model): items leaving the filtered set fade+scale out (200ms), items already visible reflow position via `layout` (FLIP, ~350ms), newly entering items fade+scale in staggered 40ms apart after the reflow starts.
- Active tab indicator: a small underline/pill that slides (`layoutId`) between tab buttons rather than instantly jumping.

### 7.11 Page/Route Transitions
- Wrap route content in `AnimatePresence mode="wait"` at the root template level; outgoing page fades/slides out slightly (150ms), incoming page fades/slides up from `y: 12` (250ms) — kept short so navigation never feels sluggish.

### 7.12 Checkout → Processing → Order Confirmed
- On "Place Order": button shows inline spinner + disables, page dims non-critical chrome slightly.
- `ProcessingOverlay`: centered animated sequence — e.g., a rotating/pulsing kanji or loading bar filling 0→100% over ~2s, with sequential status text swaps ("Verifying details…", "Confirming order…") for realism (all fake/local timing, no real network wait).
- Transition to confirmation: overlay fades out as page cross-fades into `/order-confirmed`.
- Order Confirmed page: success check-mark draws in (SVG stroke-dashoffset animation, 500ms), order number and summary rows stagger in beneath it (60ms apart), a subtle celebratory accent (soft glow pulse behind the checkmark, not confetti — stay on-brand/serious rather than playful) is optional polish.

---

## 8. Iconography & Imagery Treatment

- Icons: thin-line style (1.5px stroke), consistent sizing (20–24px), sourced from `lucide-react`.
- Product photography: consistent moody lighting/backdrop across all placeholder assets so the catalog feels shot as one cohesive drop, matching the reference's cohesive studio-shot look.
- Full-bleed background imagery (hero, ethos section) always paired with a dark scrim gradient to preserve text contrast (WCAG AA minimum for overlaid text).

---

## 9. Responsive Motion Adjustments

- Disable scroll-scrubbed parallax on touch devices (jank-prone); replace with a simple one-time reveal-on-enter.
- Reduce stagger counts/durations by ~30% on mobile to keep interactions feeling snappy on smaller, often lower-powered devices.
- Cart drawer becomes full-screen sheet on mobile (slide up from bottom is an acceptable, more thumb-friendly alternative to slide-from-right).

---

## 10. Deliverable Checklist (design QA)

- [ ] Color contrast passes WCAG AA for all text-on-image and text-on-surface combinations.
- [ ] Every interactive element has a visible hover, focus, active, and disabled state defined.
- [ ] Every motion spec above has a reduced-motion fallback.
- [ ] Type scale is consistent across pages (no one-off font sizes introduced ad hoc).
- [ ] Spacing rhythm between sections is consistent site-wide.
