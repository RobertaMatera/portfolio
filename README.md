# Portfolio — Roberta Matera

Personal portfolio of a full-stack developer focused on frontend and UX/UI product design, with a background in architecture.

**Live:** [www.robertamatera.com](https://www.robertamatera.com)

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Sass (no CSS framework)
- **Language:** TypeScript (strict mode)
- **i18n:** next-intl (`en`, `it`, `de`)
- **Linting:** ESLint 9 + `eslint-config-next`
- **Hosting:** Vercel

## Main features

- Locale-based routing under `/en`, `/it`, `/de`
- Country-aware first-visit locale selection via Next.js Proxy (`proxy.ts`)
- Fully localised content and navigation with `next-intl`
- Code project cards support separate actions for **View code** and **Live demo** when a `demoUrl` is provided
- SEO-first metadata:
  - Canonical URLs + `hreflang` alternates
  - Open Graph + Twitter metadata
  - Dynamic locale-specific Open Graph image
  - `robots.txt` and `sitemap.xml` metadata routes
  - JSON-LD structured data (`Person`, `WebSite`, `CreativeWork` / `SoftwareSourceCode`)
- Accessible UI patterns (skip link, semantic headings, focus/error handling in form)
- Contact form with shared client/server validation and server-side email delivery through Resend

## Design system and UX decisions

### Design tokens and Sass architecture

- Design tokens live in `styles/_tokens.scss` and define brand colours, surfaces, text colours, radii, layout constants, and motion timings/easing.
- Breakpoints and responsive mixins live in `styles/_breakpoints.scss`; global base/focus/reduced-motion rules are in `styles/_base.scss` and `styles/_motion.scss`.
- Global styles are composed from partials in `app/globals.scss`.
- `next.config.ts` sets Sass `loadPaths` so component styles can use shared partials consistently.
- A custom token system is used instead of a CSS framework to keep the portfolio visually distinctive and aligned with the original design mockup (`docs/mockup.html`).

### Brand

- The brand palette is green-led (`--g7`, `--g6`, `--g5`, `--lime`) and applied across navigation, cards, and accents.
- The RM logo asset is `public/images/brand/logo.webp` and is used in the top bar and footer, plus as a subtle watermark in the contact form.
- The RM monogram combines cat ears and a leaf: a personal, friendly mark that ties into the green palette.

### Accessibility patterns implemented

- Skip link to main content (`app/[locale]/layout.tsx` + `.skip-link` in `styles/_base.scss`).
- Clear keyboard focus styles via `:focus-visible`.
- Motion respects `prefers-reduced-motion` globally.
- Contact form supports:
  - shared client/server validation rules;
  - `aria-invalid` + field-level error text;
  - focus moved to the first invalid field;
  - `role="alert"` / `role="status"` status announcements.
- Form controls use accessible sizing and labels, including 16px input text to avoid iOS zoom.

### Key UX decisions

- **Locale-prefixed URLs** (`/en`, `/it`, `/de`) ensure each language has a crawlable URL.
- **First-visit locale detection** uses country headers in `proxy.ts`; this gives visitors the most likely language with no manual step.
- **Switzerland handling** resolves via browser language (`de`/`it`) with a German default, reflecting multilingual usage.
- **Cookie precedence** (`NEXT_LOCALE`) preserves user choice after language switches.

## Project structure

```txt
app/
  [locale]/
    (home)/page.tsx         # Home composition (all sections)
    layout.tsx              # Locale layout, metadata, fonts, i18n provider
    opengraph-image.tsx     # Dynamic OG image
    not-found.tsx           # Localised 404
    [...rest]/page.tsx      # Catch-all to notFound()
  robots.ts                 # robots metadata route
  sitemap.ts                # sitemap metadata route

components/
  chrome/                   # top bar, dock, footer, language menu...
  contact/                  # Contact form UI + behaviour
  pages/                    # page-level UI (e.g. not found)
  references/               # references cards/dialogs
  sections/                 # Hero, About, Services, Experience, Work, Contact
  seo/                      # JSON-LD script renderer
  ui/                       # shared UI primitives
  work/                     # project cards, dialogs, art, zoom

content/                    # Structured portfolio content (profile, projects, skills...)
docs/                       # project context, mockup and prototypes
assets/                     # static source assets (fonts, OG artwork)
github/                     # repository automation docs/instructions
i18n/                       # next-intl routing/navigation/request config
lib/
  contact/                  # validation + server action
  messages.ts               # i18n message helpers
  site.ts                   # Site URL + alternates + OG locale mapping
  structured-data.ts        # JSON-LD builders
messages/                   # Translation dictionaries (en/it/de)
public/
  files/                    # downloadable CVs
  images/                   # brand, portrait, projects
scripts/                    # local helper scripts
shared/                     # shared non-route data
styles/                     # tokens, breakpoints, base, motion, typography
proxy.ts                    # Next.js Proxy for locale routing
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

## Internationalisation details

- Locales are defined in `i18n/routing.ts` (`en`, `it`, `de`) with `localePrefix: "always"`.
- Messages are loaded per-locale from `messages/*.json` via `i18n/request.ts`.
- `proxy.ts` (Next.js **Proxy**, using `next-intl` middleware) applies first-visit locale logic:
  1. Respect selected locale cookie (`NEXT_LOCALE`) if present.
  2. Otherwise map by country header (`x-vercel-ip-country` / `cf-ipcountry`).
  3. For Switzerland (`CH`), prefer browser language between Italian/German.
  4. Fall back to default locale (`en`).

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
- **Security hygiene:** plain-text email body, header sanitisation for subject, explicit error logging for operational visibility.

## Adding content (new projects)

1. **Add the project entry** in `content/projects.ts` with a unique `id` and `kind` (`code`, `caseStudy`, or `upcoming`).
2. **Add translated copy** in `messages/en.json`, `messages/it.json`, and `messages/de.json` under `Work.projects.<id>`.
3. If it is a **case study**, also add `detail.meta`, `detail.heading`, `detail.body[]`, `detail.callout`, and `detail.images`.
4. **Add images** under `public/images/projects/...` and reference them with the `image(...)` helper in `content/projects.ts`.
5. If you introduce new tools, update:
   - the `ToolKey` union in `content/projects.ts`;
   - `Work.tools.*` labels in all locale files.

Example (`content/projects.ts`):

```ts
{
  id: "healthBridge",
  kind: "code",
  year: 2026,
  repository: "https://github.com/RobertaMatera/health-bridge-clinic",
  demoUrl: "https://health-bridge-clinic.vercel.app/login",
  stack: ["Java 21", "Spring Boot", "Angular 21"],
  programmingLanguages: ["Java", "TypeScript"],
}
```

Matching message keys (`messages/en.json`, similarly in `it`/`de`):

```json
{
  "healthBridge": {
    "title": "Health Bridge Clinic",
    "description": "Full-stack healthcare platform ...",
    "art": {
      "alt": "Minimal illustration ...",
      "line1": "care meets code",
      "line2": "JAVA · SPRING BOOT · ANGULAR"
    }
  }
}
```

## Deployment

- Platform: **Vercel**.
- Current production setup:
  - `https://www.robertamatera.com` is the primary domain.
  - Apex `robertamatera.com` redirects to `www`.
  - `robertamatera.vercel.app` redirects with HTTP 308.
- `NEXT_PUBLIC_SITE_URL` must be exactly `https://www.robertamatera.com` (used by canonical URLs, `hreflang`, sitemap, OG, and JSON-LD).
- Required production env vars:
  - `NEXT_PUBLIC_SITE_URL`
  - `RESEND_API_KEY`
  - optional `CONTACT_TO`, `CONTACT_FROM`

Short pre-deploy checklist:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Confirm env vars in Vercel.

One-time SEO setup: submit `/sitemap.xml` in Google Search Console.

## How I used AI

I used AI to refine parts of the design system and UX implementation, improve code quality and consistency, accelerate learning, and assist with Git workflows. I made all product, design and technical decisions myself.

## License

- Code: Eclipse Public License 2.0 (EPL-2.0).
- Content, images and brand assets: © Roberta Matera, all rights reserved.
