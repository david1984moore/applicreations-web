import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/ui/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  title: "Applicreations | Delaware Web Development",
  description:
    "Custom websites for Delaware small businesses. Design, development, and hosting — handled.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Applicreations | Delaware Web Development",
    description: "Custom websites for Delaware small businesses.",
    url: "https://applicreations.com",
    siteName: "Applicreations",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Applicreations | Delaware Web Development",
    description: "Custom websites for Delaware small businesses.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
