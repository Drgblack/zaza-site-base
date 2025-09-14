import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import SafeIntlProvider from "@/components/i18n/SafeIntlProvider";
import { locales } from "@/i18n";
import { ZaraAssistant } from "@/components/ai/zara-assistant";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ["latin"] });

// Minimal messages map to avoid missing-message crashes during build.
// (You can replace these with real JSON imports later.)
const MESSAGES: Record<string, Record<string, unknown>> = {
  en: {},
  de: {},
  fr: {},
  es: {},
  it: {},
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const messages = MESSAGES[locale] ?? {};

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SafeIntlProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
          {process.env.NEXT_PUBLIC_ENABLE_ZARA === "1" && <ZaraAssistant />}
        </SafeIntlProvider>
      </body>
    </html>
  );
}