import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en","es","fr","de","it"],
  defaultLocale: "en",
  // Force explicit prefixes so /privacy -> /en/privacy (no ambiguity)
  localePrefix: "always",
  localeDetection: true
});

export const config = {
  matcher: [
    // Run on everything that's not _next assets, images, or obvious files
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"
  ]
};
