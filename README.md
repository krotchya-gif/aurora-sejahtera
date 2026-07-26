# Aurora Sejahtera Tour & Travel

Tour & travel website with admin panel. Built with Next.js 16, MongoDB, NextAuth, TypeScript, Tailwind CSS.

## Tech Stack

| Stack | Version |
|---|---|
| Next.js | 16.2.12 (App Router) |
| TypeScript | 6.0.3 (strict) |
| Tailwind CSS | 4.3.3 |
| MongoDB / Mongoose | 9.8.0 |
| NextAuth | 4.24.15 |
| Zod | 4.4.3 |

## Features

**Public Website**: Homepage with hero slides, paket wisata (filter/search/sort), destinasi populer, promo section, artikel/blog, galeri foto, testimonial, team, features section, contact form with Google Maps, WhatsApp floating button, legal pages (privacy, terms, FAQ), responsive design, SEO (sitemap.xml, robots.txt, OG image).

**Admin Panel**: Authentication, dashboard with statistics, CRUD for all content (paket, artikel, testimonial, galeri, hero-slides, team, promo, features, reviews), settings (site config, SEO), image upload, profile management (change password).

**Security**: Zod validation, rate limiting (3 tiers), bcrypt hashing, JWT sessions, CORS, CSRF via NextAuth.

## Quick Start

```bash
git clone https://github.com/krotchya-gif/aurora-sejahtera.git
cd aurora-sejahtera
npm install
# Edit .env.local with MONGODB_URI & NEXTAUTH_SECRET
npm run dev
```

**Default admin**: admin@aurorasejahtera.com / admin123 (change in production)

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |

## Structure

```
src/
├── app/           # App Router (pages + API + admin)
│   ├── admin/     # Admin panel (11 sections)
│   └── api/       # REST API (25 endpoints)
├── components/    # React components (17 files)
├── lib/           # Utilities (auth, db, rate-limit, validations)
├── models/        # Mongoose models (11)
├── types/         # TypeScript interfaces
└── data/          # Static fallback data
```

API routes: paket, artikel, galeri, testimonial, reviews, team, hero-slides, promo, features, settings, upload, seed, auth.

Full CRUD for each resource with Zod validation + rate limiting.

## Requirements

- Node.js >= 22
- MongoDB (local or Atlas)
