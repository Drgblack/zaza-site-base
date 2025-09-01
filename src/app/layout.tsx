import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zaza Technologies",
  description: "AI-powered tools that save educators time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-20 lg:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
