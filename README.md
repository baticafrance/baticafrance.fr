# Site BATI-CA FRANCE

Ce dossier contient les 4 pages de ton site, prêtes à être publiées sur GitHub Pages.

## Contenu
- `index.html` — Page d'accueil (Accueil, À propos, Réalisations (aperçu), Témoignages, Contact)
- `realisations.html` — Page complète des réalisations
- `mentions-legales.html`
- `confidentialite.html`

⚠️ **À propos des images** : elles restent hébergées sur les serveurs de Google (les mêmes liens que dans ton export Stitch). Elles s'afficheront normalement une fois le site en ligne, tu n'as rien à faire. Si un jour tu veux héberger tes propres images dans le repo (plus fiable sur le long terme), dis-le-moi et je t'expliquerai comment remplacer les liens.

## Publier le site sur GitHub Pages (5 minutes)

1. Va sur [github.com](https://github.com) et connecte-toi (ou crée un compte gratuit).
2. Clique sur **New repository** (bouton vert "New").
3. Donne-lui un nom, par exemple `bati-ca-france-site`. Laisse-le en **Public**. Ne coche aucune case (pas de README auto). Clique **Create repository**.
4. Sur la page du repo vide, clique sur **uploading an existing file** (lien au milieu de la page).
5. Glisse-dépose les 4 fichiers `.html` (et ce `README.md`) dans la zone. Clique **Commit changes**.
6. Va dans l'onglet **Settings** du repo, puis dans le menu de gauche clique sur **Pages**.
7. Dans "Build and deployment" → **Source**, choisis **Deploy from a branch**.
8. Dans **Branch**, choisis `main` et le dossier `/ (root)`, puis **Save**.
9. Attends 1 à 2 minutes, rafraîchis la page : GitHub affiche l'adresse de ton site, du type :
   `https://ton-nom-utilisateur.github.io/bati-ca-france-site/`

Ton site d'accueil sera à cette adresse. La page réalisations sera à :
`https://ton-nom-utilisateur.github.io/bati-ca-france-site/realisations.html`

## Nom de domaine personnalisé (optionnel)
Si tu as un nom de domaine (ex: bati-ca-france.fr), dans **Settings > Pages > Custom domain**, renseigne-le, puis configure chez ton registrar un enregistrement CNAME pointant vers `ton-nom-utilisateur.github.io`.
