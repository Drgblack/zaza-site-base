"use client";

import * as React from "react";
import {NextIntlClientProvider} from "next-intl";

type Props = {
  locale: string;
  messages: Record<string, unknown>;
  children: React.ReactNode;
};

export default function SafeIntlProvider({locale, messages, children}: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages as any}
      onError={(err) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[i18n]", err);
        }
      }}
      getMessageFallback={({key}) => key}
    >
      {children}
    </NextIntlClientProvider>
  );
}