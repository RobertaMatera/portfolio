# Portfolio — Roberta Matera

Multilingual personal portfolio built with **Next.js 16 App Router**, **React 19**, **TypeScript (strict)**, **Sass**, and **next-intl**.  
It is optimized for recruiter-facing presentation with strong accessibility, SEO metadata, structured data, and a server-side contact flow.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Sass (no CSS framework)
- **Language:** TypeScript (strict mode)
- **i18n:** next-intl (`en`, `it`, `de`)
- **Linting:** ESLint 9 + `eslint-config-next`
- **Delivery:** Vercel-ready

## Main features

- Locale-based routing under `/en`, `/it`, `/de`
- Country-aware first-visit locale selection via edge middleware (`proxy.ts`)
- Fully localized content and navigation with `next-intl`
- SEO-first metadata:
  - Canonical URLs + `hreflang` alternates
  - Open Graph + Twitter metadata
  - Dynamic locale-specific Open Graph image
  - `robots.txt` and `sitemap.xml` metadata routes
  - JSON-LD structured data (`Person`, `WebSite`, `CreativeWork` / `SoftwareSourceCode`)
- Accessible UI patterns (skip link, semantic headings, focus/error handling in form)
- Contact form with shared client/server validation and server-side email delivery through Resend

## Project structure

```txt
app/
  [locale]/
    (home)/page.tsx         # Home composition (all sections)
    layout.tsx              # Locale layout, metadata, fonts, i18n provider
    opengraph-image.tsx     # Dynamic OG image
    not-found.tsx           # Localized 404
    [...rest]/page.tsx      # Catch-all to notFound()
  robots.ts                 # robots metadata route
  sitemap.ts                # sitemap metadata route

components/
  sections/                 # Hero, About, Services, Experience, Work, References, Contact
  contact/                  # Contact form UI + behavior
  seo/                      # JSON-LD script renderer

content/                    # Structured portfolio content (profile, projects, skills...)
i18n/                       # next-intl routing/navigation/request config
lib/
  site.ts                   # Site URL + alternates + OG locale mapping
  structured-data.ts        # JSON-LD builders
  contact/                  # Validation + server action
messages/                   # Translation dictionaries (en/it/de)
proxy.ts                    # Edge middleware for locale routing
```

## Local development

### 1) Requirements

- Node.js 20+ (recommended for Next.js 16)
- npm (project includes `package-lock.json`)

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Environment variables:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended (required in production) | Canonical origin used for canonical URLs, hreflang, sitemap, OG, and JSON-LD |
| `RESEND_API_KEY` | Required for contact form delivery | Server-side API key for Resend |
| `CONTACT_TO` | Optional | Recipient address (defaults to profile email) |
| `CONTACT_FROM` | Optional | Sender address/domain verified in Resend (defaults to Resend onboarding sender) |

### 4) Run the app

```bash
npm run dev
```

Open `http://localhost:3000` (you will be redirected to a locale path such as `/en`).

## Available scripts

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Internationalization details

- Locales are defined in `i18n/routing.ts` (`en`, `it`, `de`) with `localePrefix: "always"`.
- Messages are loaded per-locale from `messages/*.json` via `i18n/request.ts`.
- `proxy.ts` applies first-visit locale logic:
  1. Respect selected locale cookie (`NEXT_LOCALE`) if present.
  2. Otherwise map by country header (`x-vercel-ip-country` / `cf-ipcountry`).
  3. For Switzerland (`CH`), prefer browser language between Italian/German.
  4. Fallback to default locale (`en`).

## SEO and metadata implementation

- `app/[locale]/layout.tsx` generates locale-specific metadata and language alternates.
- `app/sitemap.ts` emits one entry per locale with alternate language mappings.
- `app/robots.ts` advertises host + sitemap.
- `app/[locale]/opengraph-image.tsx` generates social preview images per locale.
- JSON-LD is rendered through `components/seo/JsonLd/JsonLd.tsx` using builders in `lib/structured-data.ts`.

## Contact form flow

- **Validation:** shared rules in `lib/contact/validation.ts` used both client-side and server-side.
- **Server action:** `lib/contact/actions.ts` handles submission and delivery through Resend.
- **Spam mitigation:** hidden honeypot field (`TRAP_FIELD`) with success-shaped response for bots.
- **Security hygiene:** plain-text email body, header sanitization for subject, explicit error logging for operational visibility.

## Deployment notes

- Target platform: **Vercel**.
- Before go-live:
  - Set `NEXT_PUBLIC_SITE_URL` to the production domain.
  - Set `RESEND_API_KEY` (+ optional `CONTACT_TO`/`CONTACT_FROM`).
  - Verify `sitemap.xml` in Search Console.
  - Run performance/accessibility checks on `/en`, `/it`, `/de`.
