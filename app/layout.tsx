import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarav Mehta | Portfolio",
  description:
    "Dark-themed personal portfolio built with Next.js, Tailwind CSS, Three.js, and GSAP ScrollTrigger.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
