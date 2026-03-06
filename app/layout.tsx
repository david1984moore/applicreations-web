import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/ui/nav";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://applicreations.com"
  ),
  title: {
    default: "Applicreations — Custom Web Apps & Websites",
    template: "%s | Applicreations",
  },
  description:
    "Delaware-based custom web development. We build fast, SEO-optimized websites and web apps that turn visitors into customers. No templates. No agencies.",
  keywords: [
    "web development",
    "custom website",
    "web app",
    "Delaware",
    "Next.js",
    "small business website",
  ],
  authors: [{ name: "Applicreations" }],
  creator: "Applicreations",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://applicreations.com",
    siteName: "Applicreations",
    title: "Applicreations — Custom Web Apps & Websites",
    description:
      "Delaware-based custom web development. Fast, conversion-optimized sites built from scratch.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Applicreations — Custom Web Apps & Websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Applicreations — Custom Web Apps & Websites",
    description: "Custom web development for businesses that are done with templates.",
    images: ["/opengraph-image"],
  },
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
  alternates: {
    canonical: "https://applicreations.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Applicreations",
  description: "Custom web development for Delaware small businesses",
  url: "https://applicreations.com",
  areaServed: {
    "@type": "State",
    name: "Delaware",
  },
  serviceType: "Web Development",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${dmSerifDisplay.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
