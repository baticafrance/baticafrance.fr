# Site BATI-CA FRANCE — baticafrance.fr

Site vitrine statique (HTML + CSS compilé + un peu de JavaScript), sans serveur ni base de données.
Hébergement prévu : **Cloudflare Pages** (fonctionne aussi sur GitHub Pages).

## Pages

| Fichier | Adresse publique |
|---|---|
| `index.html` | `/` |
| `ravalement-facade.html` | `/ravalement-facade` |
| `crepi-enduit-rpe.html` | `/crepi-enduit-rpe` |
| `enduit-monocouche.html` | `/enduit-monocouche` |
| `isolation-exterieure.html` | `/isolation-exterieure` |
| `joint-de-pierre.html` | `/joint-de-pierre` |
| `realisations.html` | `/realisations` |
| `mentions-legales.html` | `/mentions-legales` |
| `confidentialite.html` | `/confidentialite` |
| `404.html` | page « introuvable » (non indexée) |

Les liens du site n'ont pas l'extension `.html`. Sur Cloudflare Pages, une ancienne adresse en `.html`
est redirigée automatiquement (redirection 308) vers l'adresse sans `.html`, en gardant la fin de l'adresse
(par exemple `?gclid=...` des annonces Google Ads).

## Dossiers et fichiers

- `css/site.css` : feuille de style compilée (ne pas modifier à la main).
- `js/site.js` : cookies, suivi Google (chargé seulement après accord), menus, formulaire de devis.
- `js/realisations.js` : filtres et curseurs avant/après de la page Réalisations.
- `fonts/` : polices hébergées sur le site (aucun appel à Google Fonts).
- `images/realisations/` : photos de chantiers (JPG + versions WebP). `images/illustrations/` : images d'illustration.
- `_build/` : sources de la feuille de style (configuration Tailwind).
- `_headers` : en-têtes de sécurité et de cache pour Cloudflare Pages.
- `sitemap.xml`, `robots.txt`, `llms.txt` : référencement.

**À ne jamais supprimer ni renommer :** `CNAME`, `google0e751d4faed9f428.html` (vérification Google Search Console).

## Modifier les styles

La mise en page utilise Tailwind CSS v3, compilé une fois en local (plus de script CDN).
Après une modification des classes dans les pages, recompiler depuis la racine du site :

```
tailwindcss.exe -c _build/tailwind.config.js -i _build/input.css -o css/site.css --minify
```

`tailwindcss.exe` : exécutable officiel « Tailwind CSS standalone CLI » v3.4.17
(github.com/tailwindlabs/tailwindcss/releases, fichier `tailwindcss-windows-x64.exe`).

## Ce qui ne doit pas être publié

Le dossier `.claude/` (agents de contrôle) et le dossier `_travail/` (audit, notes internes) sont exclus par
`.gitignore`. Si vous publiez un jour en glissant-déposant le dossier dans Cloudflare, **ne glissez pas ces deux dossiers**.

## Suivi Google Ads

Identifiants dans `js/site.js` (GA4 `G-9TTMF71Y4E`, Google Ads `AW-17460240320`, conversions devis et appel).
Ils ne sont actifs qu'après accord du visiteur dans le bandeau cookies.
