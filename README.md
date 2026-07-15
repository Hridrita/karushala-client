# Karushala 

Karushala is a high-end, full-stack web platform designed to preserve, showcase, and globalize the rich, centuries-old traditional crafts and master artisans of Bangladesh. Bridging the gap between ancient craftsmanship (like Dhakai Jamdani, traditional terracotta, and lost-wax brass casting) and contemporary global aesthetics, Karushala is built with an immersive, ultra-modern dark-neon design system.

It functions not just as a standard e-commerce store, but as a digital editorial and heritage archive that tells the deep storytelling behind every single masterpiece.

🔗 Live: https://karushala.vercel.app

---

## Tech Stack

**Frontend**
- Next.js 16.2.10 (App Router) + React 19.2.4 + TypeScript
- Tailwind CSS v4 — dark indigo-lavender design system (`zinc-950`, `#4A4FCF`, `#B8AEEA`)
- Framer Motion — page transitions, staggered animations
- React Hook Form + Zod — form validation
- Better Auth (client) — session-aware UI
- @gravity-ui/uikit + @gravity-ui/icons — UI component/icon library
- @headlessui/react — accessible unstyled UI primitives
- Chart.js + react-chartjs-2 — dashboard sales chart
- lucide-react + react-icons + Heroicons — icon sets
- Sonner — toast notifications
- ESLint 9 + eslint-config-next — linting

**Backend**
- Express + TypeScript (ESM, `tsx` + nodemon in dev)
- MongoDB (native driver)
- Better Auth (JWT/JWKS verification via `jose-cjs`)
- imgbb — image hosting for craft photos & avatars

---

## Features

**Immersive Dark-Neon UI/UX:** A visually striking user interface designed with a dark zinc aesthetic, amplified by fluid glowing accent lights (#4A4FCF and #B8AEEA) and micro-interactions.

**The Karunshala Way (Story-Driven Process):** An interactive, responsive timeline built with Framer Motion that demonstrates the ethical sourcing, patient handcrafting, and authenticity testing of heritage products to instill high customer trust.

**Artisan-Centric Storytelling:** Dedicated sections (Behind the Craft) focusing on the human element—bringing the underground, generational artisans into the digital spotlight.

### Public
- Browse all crafts with **search, multi-field filter (category + district), and sort** (price, rating, newest/oldest)
- Craft detail pages with review & rating system
- Public reviews feed
- About page (story, values, how-it-works)
- Privacy & Terms page

### Authenticated (Artisan)
- Add / edit / delete crafts with multi-image upload (imgbb)
- Manage Crafts dashboard (table + mobile card view, delete confirmation modal)
- Artisan Dashboard — stats, sales chart, recent crafts, reviews overview
- Profile page — editable info, avatar upload, stats
- Settings — profile, notifications, privacy, store, appearance (theme), security (password change), language & currency

### Auth & Access Control
- Better Auth integration (email/password, session cookies, JWT)
- **Route protection via Next.js middleware/proxy** — blocks unauthenticated access to `/dashboard`, `/add-craft`, `/manage-crafts`
- **Demo account restriction system** — demo users get read-only access; blocked from mutating actions (add/edit/delete craft, profile/settings updates) both on the **frontend** (guards + toasts) and **backend** (`restrictDemoUser` middleware) — defense in depth
- Navbar UI adapts to session state, with disabled/tooltip states for restricted demo actions

---

## Project Structure (high-level)

```
karushala-client/     # Next.js frontend
  src/
    app/               # routes: all-craft, add-craft, manage-crafts,
                        # dashboard, profile, settings, about, auth
    components/        # DashboardStats, SalesChart, RecentCrafts, etc.
    hooks/              # useAuth
    lib/                # auth-client, demo-user
  proxy.ts             # route protection + demo-user guard

karushala-server/     # Express backend
  index.ts             # all API routes, auth middleware, demo restriction
```

---

## Key API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/crafts` | List all crafts |
| POST | `/api/crafts` | Add craft (auth + demo-restricted) |
| GET | `/api/crafts/:id` | Craft details |
| PUT/DELETE | `/api/crafts/:id` | Update/delete craft (demo-restricted) |
| GET/POST | `/api/crafts/:id/reviews` | Get/add reviews (syncs avg rating) |
| GET | `/api/dashboard` | Artisan dashboard aggregate data |
| GET/PUT | `/api/profile` | Get/update artisan profile |
| GET/PUT | `/api/settings` | Get/update account settings |
| GET | `/api/reviews/public` | Recent public reviews |

---

## Environment Variables

**Frontend**
```
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
BETTER_AUTH_URL=
```

**Backend**
```
PORT=
MONGODB_URI=
BETTER_AUTH_URL=
```

---

## Local Setup

```bash
# backend
cd karushala-server
npm install
npm run dev

# frontend
cd karushala-client
npm install
npm run dev
```

---

## Roadmap / Known Gaps
- Payment/order flow (Orders collection scaffolded, aggregation ready)
- Account deletion (UI present, backend not wired)
- i18n (Bengali/Hindi toggle in settings, not yet applied app-wide)

---

