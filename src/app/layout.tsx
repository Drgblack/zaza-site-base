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
    "teacher productivity",
    "professional communication"
  ],
  authors: [{ name: "Zaza Team" }],
  creator: "Zaza Promptly",
  publisher: "Zaza Promptly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zaza-site-base.vercel.app',
    siteName: 'Zaza Promptly',
    title: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
    description: 'Transform your parent communication with AI-powered tools. Create professional emails, report comments, and feedback in seconds.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
    description: 'Transform your parent communication with AI-powered tools. Create professional emails, report comments, and feedback in seconds.',
    images: ['/images/og-image.jpg'],
    creator: '@zazapromptly',
  },
  alternates: {
    canonical: 'https://zaza-site-base.vercel.app',
    languages: {
      'en': 'https://zaza-site-base.vercel.app/en',
      'de': 'https://zaza-site-base.vercel.app/de',
      'fr': 'https://zaza-site-base.vercel.app/fr',
      'es': 'https://zaza-site-base.vercel.app/es',
      'it': 'https://zaza-site-base.vercel.app/it',
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
      <body>{children}</body>
    </html>
  );
}