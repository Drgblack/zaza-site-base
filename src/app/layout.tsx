import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://zazapromptly.com"),
  title: { default: "Zaza Promptly - AI Tools for Educators", template: "%s | Zaza Promptly" },
  description: "AI-powered tools that help teachers save 5+ hours per week with intelligent lesson planning, grading assistance, and classroom management.",
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