import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_TITLE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description:
    "A beginner-friendly, step-by-step guide to recording and replaying real Go API tests with Keploy, including the database state-drift gotcha.",
  openGraph: {
    title: SITE_TITLE,
    description:
      "Record real Go API traffic, replay it as tests, and understand the database state-drift gotcha.",
    type: "article",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
