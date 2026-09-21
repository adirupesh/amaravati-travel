# Amaravati Tours & Travel

A complete static travel agency website inspired by the supplied visual references. The compass mark, layout, copy, and component styling are original; no screenshot logos or proprietary photography were copied.

## Requirements and local setup

Use Node.js 22.13 or newer (Node.js 24 recommended) and pnpm 11. The committed `pnpm-lock.yaml` makes installs reproducible.

```sh
cd travel-agency
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. If your platform does not include Corepack, install pnpm with `npm install -g pnpm@11.19.0`. Stop the server with Ctrl+C.

```sh
pnpm typecheck
pnpm check:planner
pnpm check:deals
pnpm build
pnpm check:export
pnpm preview
```

`pnpm build` generates standalone static HTML, CSS, and JavaScript in `out/`. Preview serves this output, without a Next.js server. Stop the development server first to free port 3000. Set `NEXT_PUBLIC_SITE_URL` in `.env.local` before building to generate correct canonical URLs and the sitemap; use the supplied `.env.example` as a guide. When unset, the origin defaults to this project's associated Sites address in `src/lib/site.ts`.

## Stack and structure

- Next.js App Router, TypeScript, React, Tailwind CSS v4, and Lucide icons.
- Static export with pre-generated package routes, page metadata, canonical URLs, sitemap, robots file, and a custom favicon.
- Server-rendered content with small client components for the menu, catalogue filters, contact draft, and planner.
- `next/image` with a custom Unsplash loader: responsive `srcset`, lazy loading, explicit sizes, automatic image formats, and width/quality parameters. The primary page image is prioritised.
- Local system fonts avoid external font requests.

```text
src/
  app/
    page.tsx                  Home
    packages/page.tsx         Filterable catalogue
    packages/[slug]/page.tsx  Six statically generated detail pages
    destinations/page.tsx
    planner/page.tsx
    about/page.tsx
    contact/page.tsx
    layout.tsx                Shared shell and metadata
    globals.css               Theme, components, responsive and print styles
    sitemap.ts, robots.ts, not-found.tsx
  components/                 Reusable UI and interactive features
  lib/
    data.ts                   Typed packages, destinations, image references
    planner.ts                Date generation and imported-plan validation
    site.ts                   Site settings, navigation, price formatting
    image-loader.ts           Static-export-compatible image URLs
public/favicon.svg
scripts/check-planner.mjs
```

## Features

The visual theme pairs navy `#122E3D`, teal `#18536A`, warm gold `#DCB577`, white, and soft grey `#F4F7F6`. Serif headings contrast with readable sans-serif text. The hero has explicit “Explore packages” and “Plan your trip” actions. Package cards keep consistent image heights, align prices and metadata, and use labelled “View package” buttons; buttons stack across the card width on small mobile screens. Package detail pages retain a two-column itinerary/enquiry layout that stacks on mobile. Photography remains illustrative until agency-owned licensed photos are supplied.

Home hero and destination search; package category filtering, free-text search and price/duration sorting; destination catalogue; package highlights, day-by-day schedules, inclusion lists, and enquiry/planner links; about page; contact draft form; responsive navigation with Escape handling; skip link, labelled fields, visible focus states, semantic landmarks, reduced-motion support, and print styles.

The home page includes a responsive recent-travel video and practical experience notes. The bundled sample clip is licensed for commercial use by Coverr and should be replaced with agency-owned footage when available.

Every package-detail page includes a responsive video preview with native playback controls, a package-specific heading and route description, and a clear illustrative-footage label. The shared sample clip keeps the static site lightweight; it can be replaced with package-specific agency videos later.

The footer includes Facebook, Instagram, and YouTube icons using clearly marked sample links. Replace the platform home-page URLs in `src/components/footer.tsx` with the agency's profile URLs before promotion.

## Moderated traveller reviews

`/reviews/` lists approved reviews, filters them by package, and accepts real public submissions. New reviews are stored with `pending` status and never appear publicly until approved. The form validates length and ratings, includes consent and a honeypot, limits repeated submissions, and keeps reviewer email private. The email is removed from the stored record after an approval or rejection. The site owner moderates submissions at `/reviews/moderate/` after signing in with ChatGPT; server-side authorization checks the configured `REVIEW_ADMIN_USER_ID`. Package pages link directly to their filtered reviews.

The planner creates 1–30 inclusive travel days, optionally fills empty days from a sample package, and keeps existing entries on matching dates when dates change. A sample itinerary is a starting point; adjust its sequence to fit your chosen duration. Change the name, travellers, dates, and daily destination, activities, and notes. Save one draft in browser `localStorage`, restore it explicitly, download versioned JSON, import validated JSON, or print. Later edits require another save. Local storage may be unavailable in private or restricted browsers; downloaded copies remain an alternative. A fresh plan preserves the saved draft. Imported files are limited to 250 KB and checked for field types, lengths, date consistency, traveller bounds, and supported format version.

Package and weekly-deal enquiry buttons open WhatsApp directly at **+91 9030755369**, with the trip title and (for deals) promotion week in a prepared message. The visitor reviews and sends the message in WhatsApp; opening the link does not automatically send it. The contact page also offers a general WhatsApp chat link. Update the agency number in `src/lib/whatsapp.ts` if needed.

The contact form validates required fields and prepares a downloadable text enquiry. **It does not send email, upload personal details, make reservations, or accept payments.** No fake successful-send state is shown.

The optional, feature-detected WebMCP `read_current_itinerary` tool exposes the same visible itinerary as read-only structured data in supported browsers; it does not save, submit, or transmit an enquiry.

## Customisation before a public launch

1. Replace the sample packages, illustrative prices, routes, and inclusions in `src/lib/data.ts` with verified offers.
2. Replace sample contact copy in the contact page/footer with your verified agency details. No fabricated phone numbers, email addresses, ratings, certifications, or customer testimonials are included.
3. Update the original wordmark/compass component and favicon for your authorised branding.
4. Configure your actual site origin and rebuild. Verify the site’s existing access settings before sharing it publicly.
5. Connect enquiry delivery if required and add the corresponding privacy information. The existing demo flow remains entirely local.

## Weekly promotions

`/weekly-deals/` is the single weekly promotion page, linked in the desktop/mobile menus and footer. It displays three sample offers with regular prices, illustrative percentage savings, discounted prices, package details, and enquiry links. Two selections rotate every Monday at 00:00 in `Asia/Kolkata`, including while the page stays open. No scheduler, backend, or weekly rebuild is required for browser rotation. The prerendered HTML reflects the build week; JavaScript updates it to the current week after loading. Rebuild weekly if you also need the initial HTML and non-JavaScript view to show the current week.

Edit `src/lib/weekly-deals.ts` to choose the sample packages and discounts; regular prices come from `src/lib/data.ts`. These repeating sample offers are not inventory-aware or live promotions. Replace the demo selections and conditions with agency-approved offers before advertising real deals. Weekly selection dates are not the customer's travel dates.

## Photography

The six illustrative images are delivered from `images.unsplash.com`, not copied from the reference screenshots. Their source identifiers are listed in `src/lib/data.ts`. Treat the images as illustrative; replace them with your own licensed destination photography for publication. See the [Unsplash licence](https://unsplash.com/license).

Image delivery depends on an external CDN and a network connection. To self-host photography, supply compressed local variants and adapt the custom loader; do not use the default server image optimiser with static export. Documentation: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Static hosting

Serve the contents of `out/` at your domain root using a static host with directory-index support. Routes have trailing slashes and their own `index.html`; do not configure a blanket SPA fallback that hides 404s. Serve `404.html` for missing pages. Set security and long-lived immutable caching headers for `/_next/static/` at the hosting layer; cache HTML with revalidation. There are no API routes, server actions, runtime secrets, or database requirements. `.openai/hosting.json`, when present, records the associated private Sites deployment.

## Validation

The build verifies static rendering and route generation. `typecheck` verifies strict TypeScript. `check:planner` covers date bounds, leap days, timezone-independent day counts, note preservation, and malformed imported data. Browser checks cover package filters, package-to-planner setup, draft save/restore, contact drafts, image rendering, and mobile navigation/layout. Production export is also checked for route entrypoints and local asset references.
