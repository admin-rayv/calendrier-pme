# 📐 Architecture Technique - Calendrier PME Québec

## Vue d'ensemble

Calendrier PME est une application web statique qui affiche les dates importantes pour les PME québécoises. L'architecture privilégie la simplicité et la performance.

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL (CDN/Edge)                          │
│                   calendrierpme.ca                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS 14 (App Router)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │ Components  │  │      API Routes         │  │
│  │  - /        │  │  - Calendar │  │  - /api/subscribe       │  │
│  │  - /cal     │  │  - Card     │  │    (Buttondown proxy)   │  │
│  │  - /legal   │  │  - Badge    │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│    data/events.json     │     │      BUTTONDOWN         │
│    (Données statiques)  │     │   (Newsletter/Emails)   │
└─────────────────────────┘     └─────────────────────────┘
```

## Stack Technologique

| Couche | Technologie | Raison |
|--------|-------------|--------|
| Framework | Next.js 14 | SSG, App Router, performance |
| Langage | TypeScript | Type safety, DX |
| Styling | Tailwind CSS | Rapid development, consistency |
| Données | JSON statique | Simplicité, pas de DB à gérer |
| Emails | Buttondown | Service externe, zéro maintenance |
| Hosting | Vercel | Deploy automatique, CDN global |
| Analytics | Plausible/Umami | Privacy-first |

## Structure des Dossiers

```
calendrier-pme/
├── data/
│   └── events.json          # Toutes les dates/événements
├── docs/
│   └── ARCHITECTURE.md      # Ce fichier
├── public/
│   └── ...                  # Assets statiques
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Layout principal
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── calendrier/
│   │   │   └── page.tsx     # Page calendrier
│   │   └── api/
│   │       └── subscribe/
│   │           └── route.ts # API inscription email
│   ├── components/
│   │   ├── ui/              # Composants de base (Button, Card, etc.)
│   │   ├── calendar/        # Composants calendrier
│   │   └── layout/          # Header, Footer, etc.
│   ├── lib/
│   │   └── events.ts        # Fonctions utilitaires données
│   └── types/
│       └── event.ts         # Types TypeScript
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Flux de Données

### 1. Chargement des événements

```
events.json → getCalendarData() → Composant React → Render
```

Les données sont chargées au build time (SSG) pour des performances optimales.

### 2. Inscription newsletter

```
Formulaire → /api/subscribe → Buttondown API → Confirmation
```

## Décisions d'Architecture (ADRs)

### ADR-001: Données statiques vs Base de données

**Contexte:** Besoin de stocker ~50-100 événements par année.

**Décision:** Utiliser un fichier JSON statique.

**Raisons:**
- Les dates changent rarement (mises à jour annuelles)
- Pas besoin d'interface admin pour le MVP
- Zéro coût de base de données
- Performance maximale (données incluses dans le build)
- Facilité de maintenance (edit JSON, push, done)

**Conséquences:**
- Mises à jour requièrent un commit/deploy
- Pas de modifications en temps réel
- Migration vers DB possible plus tard si nécessaire

### ADR-002: Buttondown pour les emails

**Contexte:** Besoin de capturer des emails et envoyer des rappels.

**Décision:** Utiliser Buttondown (service externe existant).

**Raisons:**
- Compte déjà existant et configuré
- Gestion des désabonnements automatique
- Templates d'email inclus
- Conformité RGPD intégrée
- API simple

### ADR-003: Next.js App Router

**Contexte:** Choix du framework frontend.

**Décision:** Next.js 14+ avec App Router.

**Raisons:**
- SSG pour performance optimale
- SEO excellent out-of-the-box
- API routes intégrées
- Écosystème React mature
- Deploy Vercel optimisé

## Performance

### Objectifs
- Lighthouse Score > 90 (toutes catégories)
- First Contentful Paint < 1.5s
- Time to Interactive < 3s

### Optimisations
- Static Site Generation (SSG)
- Images optimisées (next/image)
- Fonts optimisées (next/font)
- Code splitting automatique
- CDN Vercel Edge

## Sécurité

- Pas de données utilisateur sensibles stockées
- API key Buttondown côté serveur uniquement
- Headers de sécurité via Vercel
- HTTPS obligatoire

## Évolutions Futures Possibles

1. **Admin Dashboard** - Pour modifier les dates sans code
2. **Base de données** - Si besoin de fonctionnalités dynamiques
3. **Comptes utilisateurs** - Préférences personnalisées
4. **Sync Google Calendar** - Export iCal
5. **Notifications push** - PWA avec service worker
