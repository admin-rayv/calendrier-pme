# Design System - Calendrier PME Québec

## 🎨 Palette de couleurs

### Couleurs principales

| Nom | Hex | Usage |
|-----|-----|-------|
| Primary | `#3b82f6` | Actions principales, liens, headers |
| Accent | `#22c55e` | Succès, confirmations, CTA secondaires |

### Couleurs par catégorie (Palette pastel)

| Catégorie | Hex | Emoji | Description |
|-----------|-----|-------|-------------|
| Fiscal | `#6B9ECF` | 💰 | Bleu pastel doux |
| Subvention | `#7DB895` | 🎁 | Vert sauge/menthe |
| Légal | `#E8A87C` | ⚖️ | Pêche/corail doux |
| Événement | `#9B8DC2` | 📅 | Lavande |
| Emploi | `#D4A5B5` | 👥 | Rose poudré |

### Neutrals

Utilise les gris Tailwind par défaut (`gray-50` à `gray-900`).

## 🔤 Typographie

### Font principale

**Inter** (Google Fonts) - Pour tout le texte.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Échelle typographique

| Élément | Classe Tailwind |
|---------|-----------------|
| H1 | `text-4xl sm:text-5xl font-bold` |
| H2 | `text-2xl sm:text-3xl font-bold` |
| H3 | `text-xl font-semibold` |
| Body | `text-base` |
| Small | `text-sm text-gray-600` |

## 🧩 Composants

### Button

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary">Action principale</Button>
<Button variant="secondary">Action secondaire</Button>
<Button variant="accent">CTA spécial</Button>
```

**Variants:**
- `primary` - Bleu, actions principales
- `secondary` - Gris/outline, actions secondaires
- `accent` - Vert, CTA conversion

### Card

```tsx
import { Card } from '@/components/ui/Card';

<Card className="p-6">
  Contenu de la carte
</Card>
```

### Badge

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge category="fiscal" />      // 💰 Fiscal
<Badge category="subvention" />  // 🎁 Subvention
<Badge category="legal" />       // ⚖️ Légal
<Badge category="event" />       // 📅 Événement
<Badge category="emploi" />      // 👥 Emploi
```

## 📐 Espacements

Utilise le système Tailwind standard:
- `p-4` / `m-4` = 16px
- `p-6` / `m-6` = 24px
- `p-8` / `m-8` = 32px

### Container max-width

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

## 📱 Breakpoints

| Breakpoint | Min-width |
|------------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## ✅ Bonnes pratiques

1. **Mobile-first** - Toujours commencer par le design mobile
2. **Accessibilité** - Contraste minimum WCAG AA
3. **Cohérence** - Utiliser les composants existants
4. **Simplicité** - UI claire et professionnelle pour PME
