# CLAUDE.md

@AGENTS.md

## Project

Personal portfolio website for Hugo Westin, built with Astro. It was started from the Astro "basics" starter template; `src/components/Welcome.astro` and the starter assets are placeholders to be replaced.

- **Content language:** English
- **Output:** static site (`astro build` → `dist/`). Hosting is not decided yet, so don't add a deployment adapter or host-specific config until it is.

## Planned pages

| Route | Purpose |
| --- | --- |
| `/` | Home / intro: who I am, short pitch, links to the other sections |
| `/projects` | Project showcase; each project is an entry in a content collection, with its own detail page |
| `/about` | About / CV: background, skills, experience |
| `/contact` | Contact: email and social links |

Every page uses the shared layout in `src/layouts/Layout.astro` (header, nav, footer).

## Design

- **Feel:** dark and techy, like a developer portfolio. Dark background, light text, one or two accent colors, a monospace font for accents (headings, labels, code-like details).
- **Styling:** plain CSS, no Tailwind or other CSS framework.
  - Define global design tokens (colors, fonts, spacing, radii) as CSS custom properties in one global stylesheet and reuse them everywhere. Don't hard-code colors.
  - Put component-specific styles in Astro's scoped `<style>` blocks inside each `.astro` file.
- Responsive and mobile-first. Check layouts at phone width.
- Accessible: semantic HTML, sufficient color contrast on the dark background, alt text on images, visible focus states.
- Prefer zero client-side JavaScript. Only add a UI framework (React, Svelte, etc.) if a feature really needs interactivity, and ask first.

## Personal content stays out of Git

All personal text (bio, About text, experience, contact details, project write-ups) lives in `content/`, which is **gitignored**. `content.example/` is the committed template with placeholder text, and `src/content.config.ts` falls back to it when `content/` is missing (fresh clone, CI).

- Never put personal text directly in `src/`. Read it from the `profile` and `projects` collections (helpers in `src/data/content.ts`).
- When adding a field to a schema, add it to `content.example/` too, with placeholder text.
- Never copy real content from `content/` into `content.example/` or other committed files.

## Terminal

`src/components/Terminal.astro` is a just-for-fun terminal (open it with `` ` `` or the `>_` button) that navigates the site with commands like `ls`, `cd about` and `cd ..`. It reads pages from `src/data/routes.ts`, so adding a page there also adds it to the nav and the terminal. It's the one deliberate exception to the "no client-side JS" preference.

## Conventions

- Components go in `src/components/` (PascalCase `.astro` files), pages in `src/pages/`, and images that should be optimized in `src/assets/` (use Astro's `<Image />`).
- Use Astro content collections for structured content like projects, rather than hard-coding data in pages.
- Keep dependencies minimal. Ask before adding new npm packages.
- Run `npm run build` to verify changes compile before calling them done.

## Working with me

I'm learning Astro and web development. When you make changes, briefly explain the relevant concept (for example, what a layout or content collection is and why we use it). Keep the explanations short and practical.
