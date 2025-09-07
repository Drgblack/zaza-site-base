import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en","es","fr","de","it"],
  defaultLocale: "en",
  // Non-prefixed paths resolve to the default-locale path (e.g., /privacy -> /en/privacy)
  localePrefix: "as-needed",
  localeDetection: true
});

export const config = {
  matcher: [
    "/",
    "/(en|es|fr|de|it)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)"
  ]
};
