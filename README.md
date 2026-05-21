# kittivong-trading

A 3-page cyber-medical motion website for a futuristic pharmacy and wellness trading brand. Built as a high-end promotional campaign — Remotion-driven animated hero, parallax brand story, interactive 3D-ish product grid, fluid contact channel, and a living trading-hub map.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Remotion 4** — `HeroKinetic` and `CyberBackground` compositions are rendered in-browser via `@remotion/player` (no pre-baked mp4 required) and are also available in Remotion Studio for design iteration / mp4 export.
- **Framer Motion 11** — page transitions, scroll parallax, magnetic cursor springs, product card 3D tilt + liquid blob.
- **Lenis** — smooth scroll (respects `prefers-reduced-motion`).

## Get started

```powershell
npm install
npm run dev          # http://localhost:3000

# In a second terminal, iterate on the Remotion compositions:
npm run remotion:studio   # http://localhost:3001

# Render the hero kinetic title to mp4 (optional):
npm run remotion:render HeroKinetic out/hero.mp4
```

## Pages

| Route | What it does |
|-------|--------------|
| `/`         | Hero (Remotion `CyberBackground` + `HeroKinetic` via `<Player>`) + 3-beat parallax Brand Story |
| `/products` | 6-card grid with magnetic spring, 3D tilt, liquid SVG blob hover, glowing micro-interactions |
| `/contact`  | Floating-label form with SVG focus border + animated SVG trading-hub map |

## Where to edit content

- **Brand colors / tokens** → `app/globals.css` (`@theme` block).
- **Product catalog** → `lib/products.ts`.
- **Trading hubs (and primary hub flag)** → `lib/hubs.ts`.
- **Brand story beats** → `components/home/BrandStory.tsx` (`beats` array).
- **Hero brand & tagline strings** → `components/home/HeroPlayer.tsx` (`inputProps` on `HeroKineticPlayer`).
- **Remotion compositions** → `remotion/HeroKinetic.tsx`, `remotion/CyberBackground.tsx`. Per Remotion best practices, animate via `interpolate()` + `Easing.bezier(...)` — **never** with CSS `transition-*` or Tailwind `animate-*` inside compositions.

## Production notes

- The `/api/contact` route is a stub — wire to your CRM/email when ready.
- The hero background is generated procedurally by Remotion, so no large video assets ship to the client. If you later supply an ambient mp4, drop it in `public/` and layer it as an `<Video>` track inside `CyberBackground.tsx`.
- Custom cursor disables itself on coarse pointers (touch devices).
- All scroll motion respects `prefers-reduced-motion`.

## Structure

```
app/                # routes + layout + globals
components/
  layout/           # nav, footer, smooth scroll, magnetic cursor, page transitions
  home/             # hero, brand story, dynamic Remotion <Player> wrapper
  products/         # grid + interactive card
  contact/          # form + trading map
  ui/               # shared primitives
remotion/           # Remotion compositions + Studio entry
lib/                # static data + utils
```
