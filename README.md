# Floris' Guitars & Gear

A personal instrument and gear archive centered on left-handed guitars, with stories, confirmed specifications, amps, pedalboard plans, accessories, songs, wishlists, and future journal posts.

Guitars are more than wood and strings. This project preserves why each instrument matters, what is known about it, and which details still need to be researched.

## Public Site

- [guitars.mrfloris.com](https://guitars.mrfloris.com/)
- [GitHub Pages project URL](https://mrfloris.github.io/guitars/)

## Browse The Archive

- [Guitar collection](https://guitars.mrfloris.com/guitars/)
- [Gibson Custom Shop '64 ES-335](https://guitars.mrfloris.com/guitars/gibson-es335/)
- [Gibson Custom SJ-200 Western Classic](https://guitars.mrfloris.com/guitars/gibson-sj200/)
- [Gibson Custom 1960 Les Paul Standard Reissue](https://guitars.mrfloris.com/guitars/gibson-les-paul-1960/)
- [Amps](https://guitars.mrfloris.com/gear/amps/)
- [Pedalboard project](https://guitars.mrfloris.com/gear/pedalboards/)
- [Accessories and storage](https://guitars.mrfloris.com/gear/accessories/)
- [Wishlist and research](https://guitars.mrfloris.com/wishlist/)
- [Songs and tabs](https://guitars.mrfloris.com/music/songs/)
- [Journal](https://guitars.mrfloris.com/blog/)

## Repository Layout

```text
starlight-pages/
  src/content/docs/   Canonical public pages
  src/styles/         Site theme and interaction styles
  public/             CNAME and static public files
resources/            Ignored private research, todos, email notes, and archives
PUBLICATION_POLICY.md Rules for moving information into the public site
.github/workflows/    GitHub Pages deployment
```

The older root-level collection documents have been consolidated into the Starlight content tree so the public archive has one source of truth.

## Local Development

Use Node.js 22.12 or newer, then run these commands from `starlight-pages/`:

```sh
npm ci
npm run check:docs
npm run dev
npm run build
```

The documentation check validates public routes, sidebar links, README links, page titles, and the custom domain. It also runs automatically before every production build. The development server uses [http://localhost:4321/](http://localhost:4321/) by default. Production output is written to the ignored `starlight-pages/dist/` directory.

## Publishing

Pushing `main` triggers the GitHub Pages workflow in `.github/workflows/deploy.yml`. Astro builds the Starlight project, GitHub Pages publishes it, and `starlight-pages/public/CNAME` keeps the custom domain attached.

## Privacy Boundary

The `resources/` directory is intentionally ignored in its entirety. It contains private source material such as receipts, correspondence, serial numbers, contact details, insurance notes, archived dealer material, raw research, and todos.

Only curated summaries belong in the public Starlight pages. Exact rules are documented in [PUBLICATION_POLICY.md](PUBLICATION_POLICY.md).

Public photos belong under `starlight-pages/src/assets/` only after serial numbers, labels, addresses, reflections, location clues, and reuse rights have been checked. Raw and private images remain under `resources/`.

## Contributing And Feedback

Corrections and guitar conversation are welcome through GitHub issues or pull requests, especially from other left-handed players.
