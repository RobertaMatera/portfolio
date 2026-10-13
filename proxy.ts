import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_LOCALE, isLocale } from "@/shared/i18n/config";
import { localizedPath, toDefaultLocalePath } from "@/shared/i18n/routing";

const PUBLIC_FILE = /\.(.*)$/;

const legacyRedirects: Record<string, string> = {
  "/tech-stack": localizedPath(DEFAULT_LOCALE, "techStack"),
  "/Resume": localizedPath(DEFAULT_LOCALE, "resume"),
  "/resume": localizedPath(DEFAULT_LOCALE, "resume"),
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const legacyTarget = legacyRedirects[pathname];
  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget, request.url), 308);
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!first || !isLocale(first)) {
    return NextResponse.redirect(new URL(toDefaultLocalePath(pathname), request.url), 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", first);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
