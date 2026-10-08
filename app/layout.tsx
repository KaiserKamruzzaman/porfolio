import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/loading-screen";
import { ChatWidget } from "@/components/chat-widget";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const siteUrl = "https://kaiserkamruzzaman.com";
const description =
  "Experienced Full-Stack Software Engineer specializing in cloud architecture and DevOps automation. Building scalable systems with React, Node.js, AWS, and modern technologies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kaiser Kamruzzaman | Full-Stack Software Engineer",
    template: "%s | Kaiser Kamruzzaman",
  },
  description,
  authors: [{ name: "Kaiser Kamruzzaman", url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kaiser Kamruzzaman",
    title: "Kaiser Kamruzzaman | Full-Stack Software Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaiser Kamruzzaman | Full-Stack Software Engineer",
    description,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gradient-to-br from-background via-background to-accent/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <LoadingScreen />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
