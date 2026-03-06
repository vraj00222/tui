import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "tui - Terminal UI Components",
  description: "A zero-dependency TypeScript Terminal UI component library built on ANSI escape codes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen font-sans">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 lg:p-12 max-w-4xl">
          {children}
        </main>
      </body>
    </html>
  );
}
