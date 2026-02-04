import type { Metadata } from "next";
import { Manrope, Newsreader, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SoulMirror } from "@/components/ui/SoulMirror";
import { RoyalCursor } from "@/components/ui/RoyalCursor";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Tricrest Press | Premium Publishing House",
  description: "Tricrest Press is a premium publishing house dedicated to bringing your words to life and offering curated excellence for readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${manrope.variable} ${newsreader.variable} ${notoSans.variable}`}>
        <body className="font-sans antialiased text-foreground bg-background" suppressHydrationWarning>
          <SmoothScroll>
            <RoyalCursor />
            <SoulMirror />
            <ConditionalLayout>{children}</ConditionalLayout>
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
