import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://calendrierpme.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Calendrier PME Québec | Échéances fiscales, subventions et obligations",
    template: "%s | Calendrier PME Québec",
  },
  description:
    "Ne manquez plus aucune échéance! Calendrier gratuit des dates importantes pour les PME québécoises: déclarations fiscales, subventions, obligations légales et événements business.",
  keywords: [
    "calendrier PME",
    "échéances fiscales Québec",
    "subventions PME",
    "obligations légales entreprise",
    "T4 Relevé 1",
    "TPS TVQ",
    "CNESST",
    "RS&DE",
    "entrepreneur Québec",
  ],
  authors: [{ name: "Calendrier PME Québec" }],
  creator: "Calendrier PME Québec",
  publisher: "Calendrier PME Québec",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "Calendrier PME Québec",
    title: "Calendrier PME Québec | Toutes vos échéances en un seul endroit",
    description:
      "Calendrier gratuit des dates importantes pour les PME québécoises. Échéances fiscales, subventions, obligations légales et événements.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calendrier PME Québec - Ne manquez plus aucune échéance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendrier PME Québec | Échéances fiscales et subventions",
    description:
      "Calendrier gratuit des dates importantes pour les PME québécoises.",
    images: ["/og-image.png"],
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
  verification: {
    // Add Google Search Console verification when available
    // google: "verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-CA">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
