# Harmony Tool

Outil de théorie musicale : explorez les degrés d'une gamme, leurs modes et leurs accords, directement dans le navigateur.

## Fonctionnalités

- 13 tonalités (de `F` à `Cb`) × 4 types de modes : **majeur**, **mineur harmonique**, **diminué**, **augmenté**
- Affichage des 7 degrés avec chiffrement romain (`I` → `VII`), mode et accord correspondant
- Colorisation de chaque degré selon la qualité de l'accord (majeure, dominante, mineure, diminuée, augmentée)
- Deux vues par degré : **Modes** (les 7 notes du mode) et **Accords** (les 4 notes de l'accord)
- Lecture audio de chaque degré : le mode note par note ou l'accord (Tone.js)
- Navigation partageable via l'URL (`/#/C/harmonic%20minor`)

## Stack technique

- [Vue 3](https://vuejs.org/) avec `<script setup>` + TypeScript
- [Vite](https://vite.dev/) pour le build
- [vue-router](https://router.vuejs.org/) pour le routage
- [tonal](https://github.com/tonaljs/tonal) pour la théorie musicale
- [Tone.js](https://tonejs.github.io/) pour la synthèse audio
- [Vitest](https://vitest.dev/) pour les tests

## Démarrage

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (vue-tsc + vite)
npm run preview  # prévisualisation du build
npm run test     # lancement des tests unitaires
```

## Structure du projet

```
src/
├── components/
│   └── Degree.vue          # carte d'un degré (mode, accord, lecture audio)
├── utils/
│   ├── notation.ts         # chiffrement romain et qualité d'accord
│   └── TonePlayer.ts       # lecture des notes/accords via Tone.js
├── tests/unit/             # tests Vitest
├── views/
│   └── ToneView.vue        # liste des degrés/modes de la gamme active
├── router.ts
└── App.vue                 # en-tête, tonalités, types de gamme, pied de page
```

## Auteur

Construit avec ♥ par [Sylvain Pastor](https://www.linkedin.com/in/websylvain/).
