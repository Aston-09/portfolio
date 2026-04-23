import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aston — Portfolio",
  description:
    "Aston's portfolio — crafting secure, scalable & stunning digital experiences with modern web technologies.",
  keywords: ["Aston", "Full-Stack Developer", "Portfolio", "Next.js", "Security"],
  openGraph: {
    title: "Aston — Portfolio",
    description: "Crafting secure, scalable & stunning digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${outfit.variable}`}
    >
      <head>
        <link rel="icon" href="/logo.jpg" sizes="any" />
      </head>
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
