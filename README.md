# 📅 Calendrier PME Québec

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/admin-rayv/calendrier-pme)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Ne manquez plus aucune échéance importante pour votre PME québécoise.

Un calendrier interactif regroupant toutes les dates importantes pour les PME au Québec : échéances fiscales, dates limites de subventions, obligations légales et événements business.

🌐 **Site:** [calendrierpme.ca](https://calendrierpme.ca)

---

## 🎯 Fonctionnalités

- 📅 **Échéances fiscales** — TPS/TVQ, acomptes provisionnels, T4, déclarations annuelles
- 💰 **Subventions** — PCAN, CanExport, programmes provinciaux avec dates limites
- ⚖️ **Obligations légales** — CNESST, normes du travail, Loi 25, REQ
- 📆 **Événements** — Salons entrepreneurs, formations, networking

### MVP (v1.0)
- [x] Calendrier interactif mensuel
- [x] Filtres par catégorie
- [x] Liste des prochaines échéances
- [x] Inscription aux rappels par email
- [x] Responsive mobile

---

## 🛠️ Stack Technologique

| Technologie | Usage |
|-------------|-------|
| [Next.js 14](https://nextjs.org/) | Framework React avec App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Buttondown](https://buttondown.email/) | Newsletter & emails |
| [Vercel](https://vercel.com/) | Hosting & CDN |

---

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Setup local

```bash
# Cloner le repo
git clone https://github.com/admin-rayv/calendrier-pme.git
cd calendrier-pme

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Structure du Projet

```
calendrier-pme/
├── data/
│   └── events.json          # 📊 Données des événements
├── docs/
│   └── ARCHITECTURE.md      # 📐 Documentation technique
├── public/                   # Assets statiques
├── src/
│   ├── app/                  # Pages (App Router)
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── calendrier/      # Page calendrier
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── ui/              # Composants de base
│   │   ├── calendar/        # Composants calendrier
│   │   └── layout/          # Header, Footer
│   ├── lib/                  # Utilitaires
│   └── types/                # Types TypeScript
└── tailwind.config.ts
```

---

## 📜 Scripts Disponibles

```bash
npm run dev      # 🔧 Développement (localhost:3000)
npm run build    # 📦 Build de production
npm run start    # 🚀 Lancer le build
npm run lint     # 🔍 Vérifier le code (ESLint)
```

---

## ⚙️ Variables d'Environnement

Créer un fichier `.env.local` à la racine :

```env
# Buttondown (newsletter)
BUTTONDOWN_API_KEY=your_api_key_here

# Analytics (optionnel)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=calendrierpme.ca
```

---

## 📊 Ajouter/Modifier des Événements

Les événements sont stockés dans `data/events.json`. Structure :

```json
{
  "id": "fiscal-001",
  "title": "Date limite déclaration T1",
  "description": "Description détaillée...",
  "date": "2026-04-30",
  "category": "fiscal",
  "recurrence": "annual",
  "organization": "ARC",
  "sourceUrl": "https://...",
  "priority": "high"
}
```

**Catégories disponibles:** `fiscal`, `subvention`, `legal`, `event`

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

### Ajouter une nouvelle date

1. Fork le repo
2. Modifier `data/events.json`
3. Créer une Pull Request avec source officielle

---

## 📄 Licence

MIT License — voir [LICENSE](LICENSE)

---

## 🙏 Remerciements

- Données fiscales : [Revenu Québec](https://www.revenuquebec.ca/), [ARC](https://www.canada.ca/fr/agence-revenu.html)
- Données CNESST : [CNESST](https://www.cnesst.gouv.qc.ca/)

---

<p align="center">
  Fait avec ❤️ pour les PME québécoises
</p>
