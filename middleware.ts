import createMiddleware from "next-intl/middleware";
import {locales, defaultLocale} from "@/i18n/routing";

export default createMiddleware({
  locales,
  defaultLocale
});

// Everything except Next internals/files/api
export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"]
};
