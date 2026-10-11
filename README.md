# Dharani Vasan V | Developer Portfolio

A cinematic, responsive portfolio with a black-and-red visual system, animated introduction, project showcase, education and internship history, technical stack, certifications, achievements, coding profiles, and a contact section.

## Run locally

Requirements: Node.js 20.19+ (or a compatible current Node.js LTS) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Personalisation notes

- The achievement cards and coding profile numbers are maintained in `src/components/Metrics.jsx`.
- Hero copy and profile links are in `src/components/Hero.jsx` and `src/components/ProfileLinks.jsx`.
- Project entries are in `src/components/Projects.jsx`.
- The resume download served by the hero CTA is `public/assets/Dharani-Vasan-Resume.pdf`.
- The introductory animation runs automatically and respects the system's reduced-motion setting.

## Deployment

Deploy the contents of `dist/` to any static hosting provider, or connect this repository to a Vite-compatible deployment workflow.
