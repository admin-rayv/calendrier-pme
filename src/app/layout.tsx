import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const siteUrl = "https://calendrierpme.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Calendrier PME Québec 2026 | Échéances fiscales, subventions et obligations légales",
    template: "%s | Calendrier PME Québec",
  },
  description:
    "Calendrier gratuit des échéances PME au Québec pour 2026. Dates limites T2, TPS/TVQ, T4, Relevé 1, CNESST, RS&DE, subventions. Ne manquez plus aucune date fiscale ou légale importante pour votre entreprise.",
  keywords: [
    "calendrier PME Québec",
    "échéances fiscales 2026",
    "date limite T2",
    "date limite TPS TVQ",
    "déclaration T4 Relevé 1",
    "CNESST déclaration salaires",
    "crédit RS&DE",
    "subventions PME Québec",
    "obligations légales entreprise",
    "entrepreneur Québec",
    "petite entreprise Québec",
    "dates importantes entreprise",
    "rappel fiscal PME",
    "calendrier entrepreneur",
  ],
  authors: [{ name: "Calendrier PME Québec" }],
  creator: "Calendrier PME Québec",
  publisher: "RayV",
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-CA': siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "Calendrier PME Québec",
    title: "Calendrier PME Québec 2026 | Toutes vos échéances en un seul endroit",
    description:
      "Calendrier gratuit des dates importantes pour les PME québécoises. Échéances fiscales T2, TPS/TVQ, subventions, obligations légales. Mis à jour pour 2026.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Calendrier PME Québec - Ne manquez plus aucune échéance fiscale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendrier PME Québec 2026 | Échéances fiscales et subventions",
    description:
      "Calendrier gratuit des dates limites fiscales, subventions et obligations pour les PME québécoises.",
    images: ["/opengraph-image"],
    creator: "@RayV_ca",
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
  category: "business",
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
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
