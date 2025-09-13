import {getRequestConfig} from "next-intl/server";

export const locales = ["en","de","fr","es","it"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch", 
  fr: "Français",
  es: "Español",
  it: "Italiano"
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  de: "🇩🇪",
  fr: "🇫🇷", 
  es: "🇪🇸",
  it: "🇮🇹"
};

// Static import map avoids bundler issues with "import(`./messages/${locale}.json`)"
const messageImports: Record<string, () => Promise<any>> = {
  en: () => import("./messages/en.json"),
  de: () => import("./messages/de.json"),
  fr: () => import("./messages/fr.json"),
  es: () => import("./messages/es.json"),
  it: () => import("./messages/it.json"),
};
export default getRequestConfig(async ({ locale }) => {
  const code = locales.includes(locale as Locale) ? String(locale) : "en";
  const load = messageImports[code] ?? messageImports.en;
  const messages = (await load()).default;
  return { locale: code, messages };
});
