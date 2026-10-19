import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// Redirects locale-less URLs (e.g. "/") to the best match from the
// Accept-Language header or the locale cookie, falling back to English.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals, Vercel internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
