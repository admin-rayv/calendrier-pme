'use client';

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema pour la page d'accueil
export const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://calendrierpme.ca/#website",
      "url": "https://calendrierpme.ca",
      "name": "Calendrier PME Québec",
      "description": "Calendrier gratuit des échéances fiscales, subventions et obligations légales pour les PME québécoises",
      "inLanguage": "fr-CA",
      "publisher": {
        "@type": "Organization",
        "name": "Calendrier PME Québec",
        "url": "https://calendrierpme.ca"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://calendrierpme.ca/#app",
      "name": "Calendrier PME Québec",
      "description": "Application web gratuite pour suivre toutes les échéances importantes des PME québécoises: déclarations fiscales, subventions, obligations légales et événements business.",
      "url": "https://calendrierpme.ca",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "CAD"
      },
      "featureList": [
        "Calendrier des échéances fiscales",
        "Dates limites subventions PME",
        "Rappels par email",
        "Filtres par catégorie",
        "Export vers Google Calendar, Outlook, Apple Calendar"
      ],
      "screenshot": "https://calendrierpme.ca/og-image.png",
      "author": {
        "@type": "Organization",
        "name": "RayV",
        "url": "https://rayv.ca"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://calendrierpme.ca/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quand dois-je produire ma déclaration T2 (impôts des sociétés)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La déclaration T2 doit être produite dans les 6 mois suivant la fin de votre exercice financier. Par exemple, si votre année fiscale se termine le 31 décembre, vous avez jusqu'au 30 juin pour produire. Le paiement des impôts est dû dans les 2 ou 3 mois selon votre situation."
          }
        },
        {
          "@type": "Question",
          "name": "Quelles sont les dates limites pour la TPS/TVQ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les dates varient selon votre période de déclaration. Déclaration annuelle: 3 mois après la fin d'exercice. Trimestrielle: 1 mois après la fin du trimestre. Mensuelle: 1 mois après la fin du mois. La plupart des PME produisent trimestriellement."
          }
        },
        {
          "@type": "Question",
          "name": "C'est quoi le crédit RS&DE et quand faire ma demande?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le RS&DE (Recherche scientifique et développement expérimental) est un crédit d'impôt pour les entreprises qui font de l'innovation. La demande doit être faite avec votre déclaration T2, donc dans les 6 mois suivant la fin de votre exercice. C'est un des crédits les plus généreux au Canada."
          }
        },
        {
          "@type": "Question",
          "name": "Quand dois-je remettre les T4 et Relevé 1 à mes employés?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les feuillets T4 (fédéral) et Relevé 1 (Québec) doivent être remis aux employés au plus tard le 28 février de l'année suivante. Par exemple, pour l'année 2025, la date limite est le 28 février 2026."
          }
        },
        {
          "@type": "Question",
          "name": "Quelles sont les obligations CNESST pour les employeurs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vous devez produire votre Déclaration des salaires à la CNESST avant le 15 mars de chaque année. Cette déclaration sert à calculer votre prime d'assurance pour les accidents de travail. Le paiement peut être fait en un versement ou étalé sur l'année."
          }
        }
      ]
    }
  ]
};

// Schema pour la page calendrier
export const calendarPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://calendrierpme.ca/calendrier",
  "name": "Calendrier des échéances PME Québec",
  "description": "Consultez toutes les dates importantes pour votre PME: échéances fiscales, subventions, obligations légales et événements.",
  "isPartOf": {
    "@id": "https://calendrierpme.ca/#website"
  },
  "about": {
    "@type": "Thing",
    "name": "Échéances fiscales et administratives des PME au Québec"
  },
  "mentions": [
    {
      "@type": "GovernmentOrganization",
      "name": "Revenu Québec",
      "url": "https://www.revenuquebec.ca"
    },
    {
      "@type": "GovernmentOrganization", 
      "name": "Agence du revenu du Canada",
      "url": "https://www.canada.ca/fr/agence-revenu.html"
    },
    {
      "@type": "GovernmentOrganization",
      "name": "CNESST",
      "url": "https://www.cnesst.gouv.qc.ca"
    }
  ]
};
