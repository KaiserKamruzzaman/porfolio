import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Kaiser Kamruzzaman | Software Engineer & DevOps Specialist",
  description:
    "Experienced Software Engineer specializing in full-stack development, cloud architecture, and DevOps automation. Building scalable systems with React, Node.js, AWS, and modern technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gradient-to-br from-background via-background to-accent/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
