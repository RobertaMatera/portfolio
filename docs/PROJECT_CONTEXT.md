# Project Context

Project: Personal Developer Portfolio

Goal:
Create a professional portfolio to showcase frontend engineering skills.

Target audience:
- recruiters
- engineering managers
- companies hiring frontend developers

Technologies:
- Next.js 16 (App Router), React 19, TypeScript (strict)
- next-intl for routing and messages (en / it / de, `messages/*.json`)
- Sass partials with design tokens (`styles/_tokens.scss`), no CSS framework
- CSS and small client components for motion (no animation library)
- Vercel deployment

Design reference: `docs/mockup.html` (light theme only).

Quality goals:
- Lighthouse score > 90
- Excellent accessibility
- Responsive design
- SEO optimized
- Clean architecture
## Before going live

- Set `NEXT_PUBLIC_SITE_URL` to the production domain (canonical URLs, hreflang,
  sitemap, Open Graph and JSON-LD all use it; locally they point at localhost).
- Set `RESEND_API_KEY` (and optionally `CONTACT_TO` / `CONTACT_FROM`) so the
  contact form delivers; see `.env.example`.
- After deploying, run PageSpeed Insights on `/en`, `/it` and `/de` for field-like
  Lighthouse scores, and submit `/sitemap.xml` in Google Search Console.
- Content still to confirm: the hi-res portrait, EN/DE versions of the CV, and the
  original Italian wording of the two translated references.

## Final audit (step 12, local production build)

Mobile emulation, 4× CPU slowdown, ~1.6 Mbps / 150 ms network:

- LCP 1.2–2.4 s (portrait or hero title), CLS ≤ 0.02 after a full scroll.
- Initial transfer: ~162 KB JS, 10 KB CSS, 42 KB images, 60 KB fonts (compressed).
- axe-core (WCAG 2.2 AA + best practices): 0 violations in en, it and de.
- One h1 per page, no skipped heading levels, unique ids, valid JSON-LD, all
  images with alt text.
