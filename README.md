# Pati Bona

Site-ul patiseriei Pati Bona din Craiova. Angular 21 (standalone, zoneless, SSR cu prerender), GSAP ScrollTrigger pentru animații legate de scroll și Lenis pentru scroll inerțial.

## Comenzi

```bash
npm start        # dev server pe http://localhost:4200
npm run build    # build de producție + prerender în dist/PatiBona
npm test         # teste unitare (vitest)
```

## Povestea paginii principale

Pagina principală este o succesiune de capitole full-screen, în ordinea în care un client descoperă patiseria:

| Secțiune | Ce face |
|----------|---------|
| Hero | Fotografie cu masa de candy bar, acoperită de un văl alb-bleu, titlu dezvăluit cuvânt cu cuvânt, bandă cu produsele care curge continuu |
| Cozonaci | Text sticky în stânga, colaj de fotografii cu parallax în dreapta |
| Torturi | Trei torturi expuse în dreapta, cu tilt 3D după cursor și plutire lentă. Fără carusel |
| Candy bar | Galerie orizontală pinned, condusă de scroll-ul vertical (pe mobil: strip nativ cu snap) |
| Vitrina | Mozaic de fotografii cu „mai multe” |
| Contact | Hartă Google Maps și card cu telefon, adresă și program. Link-ul Contact din meniu duce aici, nu există pagină separată |

O singură temă: pagini albe, roz ca accent, bleu pe hero. Culorile secțiunilor, de sus în jos:
bleu, alb, roz la torturi, apoi alb până la subsol.

Fiecare secțiune are culoare plată, cu margine netă între ele.

## Arhitectură

```
src/
  styles/                 tokens (primitive → semantice), reset, tipografie, utilitare
  app/
    core/
      services/           PlatformService, MotionService (GSAP), SmoothScrollService (Lenis),
                          SectionNavigationService, StructuredDataService
      tokens/             BUSINESS_INFO – telefon, adresă, program, într-un singur loc
      components/         navbar, footer, scroll-progress, page-not-found
    shared/
      directives/         appReveal, appParallax, appTilt, appMarquee
      components/         app-icon (sprite SVG), app-attribute-list, app-photo-mosaic,
                          app-status-page, app-map-embed
      pipes/              safeUrl
      utils/              PaginatedList (stare pe semnale)
    features/
      home/
        data/             catalog.data.ts (imagini), story.data.ts (texte)
        models/           GalleryItem, Catalog
        services/         CatalogRepository (interfață) + StaticCatalogRepository + provideCatalog()
        sections/         hero, cozonac, torturi, candy-bar, magazin, visit
        pages/home        compune secțiunile
      legal/              pagina de termeni și condiții (date firmă în BUSINESS_INFO, text în terms.data.ts)
      work-in-progress/   pagină „în lucru”
```

Reguli respectate în cod:

- Componentele nu conțin HTML sau stiluri inline; totul e în `.html` și `.scss`, cu clase BEM.
- Animațiile trec prin `MotionService`, care creează un `gsap.context` per componentă și îl revocă la distrugere. Nimic nu rulează pe server sau când utilizatorul preferă mișcare redusă.
- Datele (imagini, texte, contact) sunt separate de prezentare și injectate prin token-uri, ca să poată fi înlocuite cu un API fără a atinge secțiunile.
- Iconițele sunt SVG dintr-un sprite (`public/svg/icons.svg`), nu emoji.

## De ce este HMR oprit pe dev

`ng serve` rulează cu `hmr: false` (vezi `angular.json`). HMR-ul de componente înlocuiește DOM-ul unei
componente păstrând instanța, iar GSAP ScrollTrigger înfășoară elementele fixate în propriul
`pin-spacer`. După un hot swap, animațiile rămâneau legate de noduri desprinse din pagină, iar
galeria orizontală de la candy bar nu mai derula. Cu HMR oprit, dev-ul se comportă ca producția.

## Imagini

Originalele stau in `image-sources/` si nu sunt servite niciodata. `npm run images` le trece prin
`scripts/optimize-images.mjs` (sharp) si scrie in `public/` versiuni WebP redimensionate la cat
afiseaza efectiv layout-ul, cu rezerva pentru ecrane retina. Dimensiunile sunt configurate pe folder,
pentru ca o poza din mozaic se vede mult mai mica decat una din galeria orizontala.

Dupa ce adaugi poze noi in `image-sources/`, ruleaza `npm run images` si adauga-le in
`src/app/features/home/data/catalog.data.ts`.

La ultima rulare: 81 de imagini, 32,3 MB -> 8,3 MB (cu 74% mai putin).

Pe langa pozele din galerie, scriptul taie din acelasi original doua imagini derivate:
`public/hero.webp` (fundalul sectiunii hero, 1600x900) si `public/og-image.jpg` (imaginea de partajare).

## SEO si partajare

`StructuredDataService` construieste marcajul schema.org (tip Bakery: adresa, telefon, program,
coordonate) din acelasi `BUSINESS_INFO` pe care il afiseaza paginile, si il scrie in `<head>`.
Fiind prerandat, apare direct in HTML-ul servit, fara sa fie nevoie de JavaScript.

Eticheta Open Graph si imaginea de partajare (`public/og-image.jpg`, generata de `npm run images`)
sunt in `src/index.html`.

Inainte de lansare seteaza `siteUrl` din `business-info.token.ts` si adresele absolute din
`index.html` la domeniul real.

## Punere pe server (nginx)

`npm run build` face build-ul si genereaza `sitemap.xml` din rutele chiar prerandate. Se urca doar
continutul folderului `dist/PatiBona/browser`, in radacina domeniului (`base href` este `/`).

Goleste folderul de pe server inainte de copiere. Altfel raman fisierele vechi, iar `/contact/`
continua sa fie servit din HTML-ul vechi, pentru ca nginx serveste fisierul existent inaintea
oricarei reguli.

```nginx
server {
    root /var/www/patibona;
    index index.html;

    # Pagina de contact a devenit o sectiune a paginii principale.
    location = /contact  { return 301 /; }
    location = /contact/ { return 301 /; }

    # Fisierele si paginile prerandate se servesc direct. Pentru orice altceva
    # se trimite invelisul gol al aplicatiei, ca sa apara pagina de 404.
    # Niciodata index.html, care este pagina principala.
    location / {
        try_files $uri $uri/index.html /index.csr.html;
    }

    # Numele fisierelor contin un hash, deci pot sta in cache un an.
    location ~* \.(js|css|webp|jpg|png|woff2|svg)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # HTML-ul nu se pastreaza in cache, altfel actualizarile raman invizibile.
    location ~* \.html$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml text/xml;
}
```

Aplicatia are si o ruta interna care trimite `/contact` catre sectiunea de contact, deci linkurile
vechi functioneaza chiar daca regula de nginx lipseste. Redirectul de pe server ramane varianta
corecta pentru motoarele de cautare.
