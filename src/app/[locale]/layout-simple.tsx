import SafeIntlProvider from '@/components/i18n/SafeIntlProvider';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SafeIntlProvider messages={messages}>
          {children}
        </SafeIntlProvider>
      </body>
    </html>
  );
}