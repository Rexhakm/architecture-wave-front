import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { mazzardSoft } from "../fonts";
import Footer from "./components/Footer";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Architecture Wave - Your atlas to a life with good design",
  description: "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/assets/Vector-12.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/assets/Vector-12.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/assets/Vector-12.png",
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
    description: "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
    siteName: "Architecture Wave",
    images: [
      {
        url: "/icons/icon-512x512.svg",
        width: 512,
        height: 512,
        alt: "Architecture Wave Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture Wave - Your atlas to a life with good design",
    description: "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
    images: ["/icons/icon-512x512.svg"],
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
        {/* Additional meta tags for better cross-browser support */}
        <meta name="msapplication-TileColor" content="#111111" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.svg" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Explicit favicon links with cache-busting to force browser refresh */}
        <link rel="icon" href="/assets/Vector-12.png?v=3" type="image/png" sizes="32x32" />
        <link rel="icon" href="/assets/Vector-12.png?v=3" type="image/png" sizes="192x192" />
        <link rel="shortcut icon" href="/assets/Vector-12.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/Vector-12.png?v=3" />
      </head>
      <body
        className={`${mazzardSoft.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-mazzard-soft)", background: '#E2E2E2' }}
      >
        <ServiceWorkerRegistration />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
