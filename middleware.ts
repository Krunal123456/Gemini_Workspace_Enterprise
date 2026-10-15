import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";

const LOCALE_COOKIE = "site-locale";

/** Paths that must never be prefixed or redirected (Next internals, assets). */
function bypassesLocaleCheck(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

function preferredLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && isLocale(fromCookie)) return fromCookie;

  // Initial load defaults to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (bypassesLocaleCheck(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix = segments.length > 0 && isLocale(segments[0]);

  // Already localized (e.g. /es/features): render it, and remember the choice so
  // unprefixed links later resolve to the same language.
  if (hasLocalePrefix) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, segments[0], {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = preferredLocale(request);

  const url = request.nextUrl.clone();
  if (locale === defaultLocale) {
    // English is the default and is served without a visible prefix, so rewrite
    // (not redirect) to keep shared/inbound links clean and canonical.
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export { locales, LOCALE_COOKIE };
