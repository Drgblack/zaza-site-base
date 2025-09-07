import {createSharedPathnamesNavigation} from "next-intl/navigation";

export const locales = ["en","es","fr","de","it"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "en";

export const routing = {
  locales: locales as readonly string[],
  defaultLocale
} as const;

/**
 * Locale-aware navigation helpers used in Header/Footer/etc.
 * These must be exported since components import { Link, usePathname } from "@/i18n/routing".
 */
export const {
  Link,
  redirect,
  useRouter,
  usePathname,
  useParams,
  getPathname
} = createSharedPathnamesNavigation({locales: locales as unknown as string[]});
