import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://zazapromptly.com"),
  title: { default: "Zaza Promptly", template: "%s | Zaza Promptly" },
  description: "AI-powered parent communication for teachers",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}