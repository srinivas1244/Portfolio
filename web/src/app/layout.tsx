import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ToasterProvider } from "@/components/providers/Toaster";
import { JsonLdSchema } from "@/components/providers/JsonLdSchema";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://perala-srinivasulu.vercel.app";
const description =
  "Perala Srinivasulu — AI Engineer, Full-Stack Developer & Cloud Enthusiast based in Hyderabad. Building intelligent products with React, Spring Boot, and LLMs like Gemini & Claude.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Perala Srinivasulu — AI Engineer & Full-Stack Developer",
    template: "%s · Perala Srinivasulu",
  },
  description,
  keywords: [
    "Perala Srinivasulu",
    "AI Engineer",
    "Full-Stack Developer",
    "Cloud Enthusiast",
    "React",
    "Next.js",
    "Spring Boot",
    "Generative AI",
    "Hyderabad",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.socials.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Perala Srinivasulu — AI Engineer & Full-Stack Developer",
    description,
    siteName: "Perala Srinivasulu",
    images: [{ url: "/profile.jpg", width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perala Srinivasulu — AI Engineer & Full-Stack Developer",
    description,
    images: ["/profile.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06060b" },
    { media: "(prefers-color-scheme: light)", color: "#eceef5" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint to set the theme class — prevents a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){d.classList.add('light');}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <JsonLdSchema />
      </head>
      <body className="grain min-h-screen text-fg">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ToasterProvider />
        <BackgroundFX />
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <CommandPalette />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
