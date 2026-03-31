# PatiBona — Patiseria Bunicii

A modern Angular SPA for **Patiseria Bunicii** ("Bunica's Pastries"), a Romanian homemade dessert business. The site showcases the pastry shop's products through a visually warm, responsive interface with light/dark theme support.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21.1.0 |
| Language | TypeScript 5.9 |
| Styling | Bootstrap 5.3.8 + custom SCSS theming |
| Testing | Vitest 4.x |
| Package Manager | npm 11.x |
| Build Tool | Angular CLI / `@angular/build` |

---

## Project Architecture

### High-Level Structure

```
src/
├── app/
│   ├── core/               # Singleton components: Navbar, Footer, PageNotFound
│   ├── shared/             # Shared module (reusable declarations/imports)
│   ├── features/           # Lazy-loaded feature modules
│   │   ├── dashboard/      # Home / landing page
│   │   ├── gallery/        # Full product gallery
│   │   └── work-in-progress/  # Placeholder for upcoming pages
│   ├── environments/       # environment.ts / environment.prod.ts
│   ├── app-module.ts
│   ├── app-routing-module.ts
│   ├── app.ts
│   └── app.html
└── styles.scss             # Global styles & CSS variable theme system
public/                     # Static assets (images, icons, fonts)
```

### Module Map

| Module | Type | Responsibility |
|---|---|---|
| `AppModule` | Root | Bootstraps the app; imports CoreModule & routing |
| `CoreModule` | Singleton | Declares and exports `Navbar`, `Footer`, `PageNotFound` |
| `SharedModule` | Shared | Common imports re-exported to feature modules |
| `DashboardModule` | Feature (lazy) | Home page with hero section, gallery preview, and quote carousel |
| `GalleryModule` | Feature (lazy) | Full gallery split by category: cakes, candy bar, pastries |
| `WorkInProgressModule` | Feature (lazy) | Placeholder page for sections under construction |

### Routing

All feature modules are **lazy-loaded** via `loadChildren`:

| Path | Module | Component |
|---|---|---|
| `/` | DashboardModule | `Dashboard` — hero + preview |
| `/gallery` | GalleryModule | `Gallery` — categorised image grid |
| `/work-in-progress` | WorkInProgressModule | `WorkInProgress` — placeholder |
| `**` | *(eager)* | `PageNotFound` — 404 page |

### Components

| Component | Location | Description |
|---|---|---|
| `App` | `app/` | Root shell with `<router-outlet>` |
| `Navbar` | `core/components/navbar/` | Responsive nav with dark mode toggle & mobile hamburger menu |
| `Footer` | `core/components/footer/` | Contact details and social links |
| `PageNotFound` | `core/components/page-not-found/` | 404 page |
| `Dashboard` | `features/dashboard/` | Landing page |
| `Gallery` | `features/gallery/` | Product gallery |
| `WorkInProgress` | `features/work-in-progress/` | Placeholder page |

### Theming & Design System

Styles are driven by **CSS custom properties** defined in `src/styles.scss`, enabling seamless light/dark switching via a `dark-theme` class toggled on `<body>`:

```scss
/* Light theme (default) */
:root {
  --bg:       #f8ebdd;
  --surface:  #fff8f2;
  --text:     #3f2413;
  --primary:  #7a4b2a;
  --accent:   #ff4f93;
  --accent-2: #5ee7ff;
}
```

- **Typography:** Poppins (body) · Playfair Display (headings)
- **Grid:** Bootstrap 5 responsive grid
- **Transitions:** 0.35 s ease for theme switching
- **Scroll:** `scroll-behavior: smooth` globally

### State Management

No external state management library. State is held at **component level** using local properties. There are currently no services, guards, interceptors, or pipes beyond Angular built-ins.

### Backend Integration

No backend is integrated yet. All content (gallery items, quotes, product lists) is **hardcoded in components**. Environment files (`environment.ts` / `environment.prod.ts`) are in place for future API configuration.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm 11.x (`npm install -g npm@11`)
- Angular CLI (`npm install -g @angular/cli`)

### Install dependencies

```bash
npm install
```

### Development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app hot-reloads on file changes.

### Build

```bash
ng build
```

Production artifacts are output to `dist/`. The build is optimised and hashed for caching.

### Unit tests

```bash
ng test
```

Runs unit tests with [Vitest](https://vitest.dev/).

### Code scaffolding

```bash
ng generate component features/<name>/components/<component-name>
```

See `ng generate --help` for all available schematics.

---

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Vitest Docs](https://vitest.dev/)
