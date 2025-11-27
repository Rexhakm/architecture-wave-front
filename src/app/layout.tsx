import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { mazzardSoft } from "../fonts";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Architecture Wave - Your atlas to a life with good design",
  description:
    "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
  // Keep manifest for PWA
  manifest: "/manifest.json",
  icons: {
    // Use a proven-working PNG asset for favicons instead of the oversized PNG-pretending-to-be-ICO
    icon: [
      {
        url: "/assets/browser-icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Architecture Wave",
  },
  applicationName: "Architecture Wave",
  authors: [{ name: "Architecture Wave Team" }],
  keywords: ["architecture", "design", "lifestyle", "culture", "trends"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#111111",
  colorScheme: "light",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://architecturewave.com",
    title: "Architecture Wave - Your atlas to a life with good design",
    description:
      "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
    siteName: "Architecture Wave",
    images: [
      {
        url: "/icons/icon-512x512.png", // use PNG for OG/Twitter, not SVG
        width: 512,
        height: 512,
        alt: "Architecture Wave Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture Wave - Your atlas to a life with good design",
    description:
      "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
    images: ["/icons/icon-512x512.png"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Keep Windows tile meta if you want */}
        <meta name="msapplication-TileColor" content="#111111" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnects for fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Explicit favicon links for stubborn browsers (especially Safari) */}
        <link
          rel="icon"
          href="/assets/browser-icon.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="shortcut icon"
          href="/assets/browser-icon.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/assets/browser-icon.png"
        />
        {/* Preload assets used immediately in header to avoid flicker on first paint */}
        <link
          rel="preload"
          as="image"
          href="/assets/arch_icon.png"
          imageSrcSet="/assets/arch_icon.png 1x"
        />
      </head>
      <body
        className={`${mazzardSoft.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-mazzard-soft)", background: "#E2E2E2" }}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-PQ89L42VT2"} />
        </Suspense>
        <Suspense fallback={null}>
          <ServiceWorkerRegistration />
        </Suspense>
        <Suspense fallback={null}>
          <div className="flex-grow">{children}</div>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
