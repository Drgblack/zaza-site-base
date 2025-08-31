import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: { default: "Zaza", template: "%s – Zaza" },
  description: "AI tools that help teachers thrive.",
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
