import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zaza-site-base.vercel.app'),
  title: {
    default: "Zaza Promptly - AI-Powered Parent Communication for Teachers",
    template: "%s | Zaza Promptly"
  },
  description: "Transform your parent communication with AI-powered tools. Create professional emails, report comments, and feedback in seconds. Trusted by educators worldwide.",
  keywords: [
    "teacher communication",
    "parent emails", 
    "AI writing assistant",
    "school communication",
    "education technology",
    "teacher productivity"
  ],
  authors: [{ name: "Zaza Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Zaza Promptly',
    title: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
    description: 'Transform your parent communication with AI-powered tools. Create professional emails, report comments, and feedback in seconds.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
    description: 'Transform your parent communication with AI-powered tools. Create professional emails, report comments, and feedback in seconds.',
  },
  alternates: {
    canonical: 'https://zaza-site-base.vercel.app',
    languages: {
      'en': 'https://zaza-site-base.vercel.app/en'
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>{children}</body>
    </html>
  );
}