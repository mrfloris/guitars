# Starlight Public Site

This directory contains the canonical public site for [guitars.mrfloris.com](https://guitars.mrfloris.com/). It uses [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/).

## Commands

Run from this directory:

| Command | Action |
| --- | --- |
| `npm ci` | Install the locked dependencies |
| `npm run dev` | Start the local site at `http://localhost:4321/` |
| `npm run build` | Build the production site into the ignored `dist/` directory |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show Astro CLI help |

## Content Structure

```text
src/content/docs/
  about/       Archive and publication approach
  blog/        Journal index and future posts
  gear/        Amps, pedalboards, accessories, and storage
  guitars/     Collection overview and individual guitar pages
  music/       Songs, tabs, and practice notes
  index.mdx    Homepage
  wishlist.md  Public research and future ideas
```

`astro.config.mjs` owns the navigation, site metadata, and custom domain. `src/styles/custom.css` contains the restrained visual theme and interactive card states.

## Private Source Material

Never copy the repository's ignored `resources/` directory wholesale into this site. It may contain serial numbers, invoices, exact prices, contact details, correspondence, insurance records, private photos, and unfinished research.

Use the repository-level `PUBLICATION_POLICY.md` before promoting facts or images into a public page.

## Deployment

A push to `main` runs the GitHub Pages workflow from the repository root. `public/CNAME` declares `guitars.mrfloris.com` as the custom domain.
