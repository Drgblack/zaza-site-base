import { setRequestLocale } from '@/lib/intl-compat';
import {notFound} from "next/navigation";
import {Inter} from "next/font/google";
import {NextIntlClientProvider} from "next-intl";
import {  getTranslations} from "next-intl/server";
import {locales} from "@/i18n";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ZaraAssistant } from "@/components/ai/zara-assistant";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const { locale } = params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Mark this subtree as rendered for the given locale
  setRequestLocale(locale);

  // Load messages for this locale with fallback to English
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to English if locale messages don't exist
    messages = (await import(`@/messages/en.json`)).default;
  }

  // Also get a server translator so we can render one visible proof string
  const t = await getTranslations({locale});

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            {/* Visible i18n proof, remove later once satisfied */}
            <div className="text-xs text-gray-400 px-4 py-1">
              {t("brand")}
            </div>
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
          {process.env.NEXT_PUBLIC_ENABLE_ZARA === "1" && <ZaraAssistant />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
