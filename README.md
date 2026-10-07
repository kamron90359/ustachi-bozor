# USTACHI.UZ — Full Marketplace Ecosystem

A production-quality React (JavaScript + JSX) service marketplace: public website, customer/master/admin panels, map search, chat, calendar, notifications, verification, reports, support, premium architecture, and an App + Telegram Bot ecosystem — all sharing one design system.

## Tech stack
React 19 (JSX) · Vite 8 · React Router · plain CSS (see `src/css/`) · React Hook Form + Zod · Zustand · Recharts · Lucide React

## Styling
Styling no longer depends on the Tailwind build plugin. Every utility class used across the app (e.g. `flex`, `gap-4`, `rounded-2xl`) is pre-generated as static CSS and organized under `src/css/`:

- `src/css/tokens.css` — design tokens (colors, spacing, typography, shadows) as CSS custom properties
- `src/css/reset.css` — base element reset
- `src/css/utilities.css` — the generated utility classes referenced by components' `className="..."`
- `src/css/custom.css` — hand-written site rules (base html/body, scrollbar, focus ring, animations)
- `src/css/fonts.css` — the Inter webfont import
- `src/css/main.css` — single entry point that `@import`s the above in the right cascade order (imported once from `src/main.jsx`)

Components' JSX and `className` strings are unchanged, so the visual result is identical — only the styling source moved from a build-time compiler into a plain, editable CSS folder. To add a new style, either add a new rule to `custom.css` or extend `utilities.css` directly.

## Getting started
```bash
npm install
npm run dev       # start dev server
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build
```

## Test accounts (password: `test1234`)
- Customer: `customer@test.uz`
- Master: `master@test.uz`
- Admin: `admin@test.uz`

## What's implemented

**Public site** — homepage (hero, search, categories, recommended masters, app + Telegram promo, how-it-works, trust section, ecosystem section, stats), master search with **list/map toggle**, filters (category, region, price, rating, verified, availability), sort (rating, price, experience, new, response time, order count), recent searches, category pages, master profile (stats row, badges, tabs, embedded map, favorite/message/report actions), request modal with calendar + time-slot picker, safety page, support center (FAQ + ticket submission).

**Map search** — reusable `MapView` component (schematic, dependency-free) with master markers positioned from lat/lng, click-to-preview mini card, zoom controls. Architecture mirrors a real provider integration (Leaflet/Mapbox/Google Maps), so swapping one in later only touches this component.

**Availability & badges** — 🟢 Hozir mavjud / 🟠 Band / ⚪ Offline status, ✓ Verified, 🏆 Top usta, ⚡ Tez javob beradi, driven by `Master.availabilityStatus`, `topMaster`, `fastResponder`, `plan` fields.

**Customer panel** — dashboard, requests, orders (with review flow), favorites, messaging (chat), **notification center**, profile, settings. Mobile bottom nav (Bosh sahifa / Buyurtmalar / Sevimlilar / Xabarlar / Profil).

**Master panel** — 8-step onboarding wizard, dashboard with chart, requests (accept/reject), orders (status flow), **calendar** (booked-date view + working-hours context), services CRUD, portfolio CRUD, working-hours editor, reviews, statistics, messaging, notification center, profile, 3-way availability toggle. Mobile bottom nav (Bosh sahifa / So'rovlar / Buyurtmalar / Xabarlar / Profil).

**Admin panel** — dashboard (real-data stat cards + charts), users (search/filter/block/delete), masters (filter tabs, top-master toggle, block/unblock), verification center (approve/reject/request-info, with documents & portfolio preview), orders, **reports/complaint moderation** (resolve/reject/block), categories CRUD, reviews, **support ticket center** (reply, status), **notification broadcast composer**, statistics, **premium/top-master plan management**, **Telegram Bot analytics**, **Mobile App analytics + store-link config**, settings. Mobile: hamburger drawer (no bottom nav, per spec).

**App + Telegram ecosystem** — `src/config/app.ts` centralizes every external URL (Google Play, App Store, Telegram bot/channel, socials); reusable `GooglePlayButton`, `AppStoreButton`, `TelegramButton`, `PhoneMockup` (5 screen variants), `QRCodeCard`, `AppDownloadBanner`, `TelegramBotBanner`, `PlatformCard`. Homepage shows App + Telegram cards side by side (stacked on mobile); mobile drawer menu links to both.

**Shared architecture** — mock backend entirely in `src/services/*` on top of `localStorage` (`src/services/db.ts`), with shared object shapes documented in `src/types/index.js` (Master, Order, Review, Message, Notification, Report, SupportTicket, RecentSearch, etc.) — no persistence logic inside components. Role-based route protection (`RoleRoute`) for customer/master/admin. Shared UI kit: buttons, inputs, selects, modals, toasts, skeletons, empty/error states, pagination, confirm dialogs, calendar, time-slot picker.

**Responsive** — mobile bottom navigation (public + customer + master), mobile drawer menus, mobile filter bottom-sheets, accordion footer on mobile, sticky header with scroll shadow, PWA manifest (`public/manifest.webmanifest`) and theme-color meta for install-ready groundwork. Tested against 360–1920px breakpoints with no horizontal overflow.

All UI text in Uzbek.

## Notes / known simplifications
Given the scope of the brief, these are intentionally simplified for this delivery and are good next steps:
- **Map**: `MapView` is a schematic, dependency-free map (no real tiles) — swap in Leaflet/Mapbox/Google Maps by replacing this one component; marker coordinates and click-to-preview architecture are already in place.
- **Chat**: real-time delivery is mocked via `localStorage` (no WebSocket), and there's no typing-indicator/online-status persistence — the `messageService` API is shaped so a WebSocket layer can replace the storage calls later.
- Image uploads (avatar, portfolio, request attachments) are simulated with placeholder images rather than real file storage.
- Phone/SMS verification codes are mocked (`1234` always works).
- `QRCodeCard` renders a deterministic decorative QR-style pattern (not a scannable real QR) — swap in a real QR-generation library (e.g. `qrcode`) once real store/bot URLs are final.
- Google Play / App Store / Telegram URLs in `src/config/app.ts` are placeholders — update them once live, and every button across the site updates automatically.
- Premium/Top Master plans are admin-assignable only — no real payment integration (Click/Payme/Uzum/Stripe) is wired up, per instructions to prepare the architecture rather than implement billing.
- Service worker / offline caching for the PWA manifest isn't implemented — only the manifest + theme-color groundwork is in place.
- The bundle isn't code-split (single JS chunk ~420KB gzipped) — fine for a demo, but worth adding route-based `React.lazy` before shipping to production.
- Dashboard sidebars (customer/master/admin) use a drawer below `lg` (1024px) for both tablet and mobile, rather than a separate collapsible-icon-only tablet mode.
