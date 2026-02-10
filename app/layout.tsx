import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

const ahsing = localFont({
  src: "../public/fonts/ahsing-regular.otf",
  variable: "--font-ahsing",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${ahsing.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <span className="fixed bottom-2 right-3 text-[10px] text-black/20 z-50 pointer-events-none">Created by Mateo S.</span>
      </body>
    </html>
  );
}
