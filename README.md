# Première Classe

Site de révision pour toute la classe de **Première générale** : fiches, cours, exercices corrigés et représentations interactives, au programme officiel.

- **Tronc commun** : Français, Histoire-Géographie, Anglais, Espagnol, Maths (tronc commun)
- **Spécialités** : Mathématiques, Physique-Chimie, SVT, NSI, Anglais monde contemporain (LLCER AMC)

Chaque chapitre a quatre onglets : **Fiche**, **Cours**, **Exercices** (difficulté 1 → 3, indices, corrigés) et **Représentation** (modules interactifs, schémas SVG, QCM, flashcards, textes à trous, associations…).

## Accès

Bouton **Commencer** → pop-up de code d'invitation. Code : `Hello27` (proposé directement dans la pop-up, insensible à la casse). On choisit ensuite ses 3 spécialités. Progression, favoris et thème sont stockés localement (`localStorage`).

## Développement

```bash
npm install
npm run dev        # serveur de dev
npm run build      # typecheck + build statique dans dist/
npm run validate   # vérifie le contenu : LaTeX (KaTeX), widgets, QCM, SVG…
```

Le build est statique (HashRouter, `base: './'`) : `dist/` se déploie tel quel sur n'importe quel hébergement (GitHub Pages, Netlify, Vercel…).

## Structure

```
src/
  content/
    types.ts            modèle de contenu (Block, Exercise, Chapter)
    subjects.ts         métadonnées des matières
    <matiere>/NN-*.ts   un fichier par chapitre (chargé automatiquement)
  widgets/<id>.tsx      modules interactifs (chargés à la demande)
  components/           UI (style shadcn, coins carrés), rendu des blocs, LaTeX
  pages/                Landing, Onboarding, Dashboard, Matière, Chapitre
docs/CONTENT_GUIDE.md   guide de rédaction des chapitres et widgets
```

Stack : Vite, React 18, TypeScript, Tailwind CSS 3, KaTeX, lucide-react.
