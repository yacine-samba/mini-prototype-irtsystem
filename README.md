# Mini prototype IRT SystemX — Next 15.5.3 + Material UI

Un écran **front‑end** minimaliste pour illustrer une démarche d’apprentissage :

* **Aperçu**: 3 KPI synthétiques
* **Données**: petite table (3 lignes d’exemple)
* **Scénario**: formulaire court (sélecteur de modèle, slider d’itérations, upload fictif, lancement + historique)
* **Notice 1 page** embarquée (dialog)

> **Objectif** : montrer rapidement la capacité à structurer une UI claire et utile, sans back-end.

---

## ⚙️ Stack & prérequis

* **Next.js**: 15.5.3 (App Router)
* **React**: 18.3.x
* **Material UI** v5 (+ @emotion)
* **Node**: ≥ 18.18.0 (ou 20+ recommandé)

```bash
npm i next@15.5.3 \
  @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## 🚀 Démarrage rapide

1. **Créer** un projet

   ```bash
   npx create-next-app@latest irt-proto
   cd irt-proto
   ```
2. **Installer** les dépendances MUI (voir bloc ci‑dessus).
4. **Lancer** en dev :

   ```bash
   npm run dev
   # http://localhost:3000/irt-prototype
   ```
5. **Build** / **Start** :

   ```bash
   npm run build
   npm start
   ```

---

## 🗂️ Structure (une seule page)

```
app/
└─ irt-prototype/
   └─ page.tsx        # composant client "use client" (React + MUI)
```

\*\*Dans \*\*\`\`

* `KPI` (composant carte KPI)
* `Page` (composant principal)

  * State local: `tab`, `scenario` (`modele`, `iterations`, `note`), `history`, `openSnack`, `openNotice`
  * Handlers: `runScenario()` (simule l’exécution et pousse dans l’historique)
  * UI: `Tabs` (Aperçu / Données / Scénario) + `Dialog` (Notice)

---

## 🧩 Points de personnalisation

* **Couleurs / thème**: objet `theme` MUI (`palette`, `typography`, `shape`)
* **KPI**: remplacez les valeurs mockées ("1.2 s", "128", "97%")
* **Données**: remplacez les 3 lignes d’exemple dans la table
* **Scénario**:

  * options du `Select` (baseline/avancé)
  * bornes du `Slider` (1 → 100)
  * branchement sur une **API réelle** : remplacez `runScenario()` par un `fetch('/api/run-scenario')` (POST)
* **Notice**: mettez vos consignes internes (titres, étapes, liens)

---

## ✅ Comportement attendu (Test manuel rapide)

* **Navigation**

  * Cliquer chaque onglet **Aperçu / Données / Scénario** → la section correspondante s’affiche.
* **Sélecteur de modèle**

  * Changer la valeur (Baseline ↔ Avancé) **met à jour l’état** `scenario.modele` (pas d’appel réseau par défaut).
* **Slider d’itérations**

  * Glisser entre **1** et **100** → `scenario.iterations` suit la valeur.
* **Lancer le scénario**

  * Cliquer **Lancer le scénario** → **Snackbar** "Scénario lancé (simulation)" + 1 ligne ajoutée en tête de **Historique** (date, modèle, itérations).
* **Notice**

  * Cliquer **Notice 1 page** → ouverture du **Dialog** avec les explications.

> Si vous souhaitez que le **changement de modèle** déclenche **automatiquement** un lancement, dites‑le : on appellera `runScenario()` dans le `onChange` du `Select`.

---

## 🧪 Idées de tests (faciles à automatiser plus tard)

* **Rendu initial**: l’onglet Aperçu est sélectionné, 3 cartes KPI sont visibles.
* **Scénario**: après un clic sur "Lancer", la snackbar apparaît et la table Historique passe de `0` à `1` ligne.
* **Accessibilité**: `Tabs` navigables au clavier (flèches), focus visible, labels présents.

---

## 🛠️ Déploiement

* **Vercel** (recommandé)

  1. Pousser le repo sur GitHub
  2. Importer dans **Vercel** → build auto (Next 15 supporté)
  3. Partager l’URL aux destinataires (Paolo / Mohamed)

---

## ❓Dépannage

* **Page blanche**: confirmer le chemin `/irt-prototype` et la présence de `"use client"` en tête du fichier.
* **Node trop ancien**: mettre à jour (≥ 18.18) ou utiliser Node 20 LTS.

---

## Licence

Usage démonstratif uniquement (projet de candidature / apprentissage).
