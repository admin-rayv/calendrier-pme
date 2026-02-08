# 📅 Calendrier PME Québec

Un calendrier interactif avec toutes les dates importantes pour les PME québécoises.

## 🎯 Fonctionnalités

- 📅 **Échéances fiscales** — Acomptes provisionnels, T4, relevés, TPS/TVQ
- 💰 **Dates limites de subventions** — PCAN, CanExport, BDC, et plus
- 📋 **Obligations légales** — CNESST, normes du travail, Loi 25
- 🎯 **Événements business** — Salons, formations, networking

## 🛠️ Stack Technologique

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Base de données:** Supabase
- **Déploiement:** Vercel
- **Langage:** TypeScript

## 🚀 Installation

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

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
calendrier-pme/
├── src/
│   ├── app/               # App Router (Next.js 14+)
│   │   ├── layout.tsx     # Layout principal
│   │   ├── page.tsx       # Page d'accueil
│   │   └── calendrier/    # Page calendrier
│   ├── components/        # Composants React
│   └── lib/               # Utilitaires et configs
├── public/                # Assets statiques
└── docs/                  # Documentation
```

## 📜 Scripts Disponibles

```bash
npm run dev      # Lancer en développement
npm run build    # Build de production
npm run start    # Lancer le build
npm run lint     # Vérifier le code avec ESLint
```

## 🤝 Contribution

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines.

## 📄 Licence

MIT License — voir [LICENSE](LICENSE)

---

**🌐 Site:** [calendrierpme.ca](https://calendrierpme.ca)
