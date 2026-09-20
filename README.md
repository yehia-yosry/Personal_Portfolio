# Yehia Yosry — Portfolio

Frontend-only portfolio built with React, TypeScript, Tailwind CSS v4 and React Router. No backend.

```bash
npm install
npm run dev       # local development
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Where to change things

| What | Where |
| --- | --- |
| Name, motto, email, WhatsApp number, GitHub / LinkedIn URLs, CV path | `src/data/site.ts` |
| Profile photo | replace `src/assets/profile/profile.png` (crop: `src/components/Portrait.tsx`) |
| CV PDF | replace `public/Yehia-Yosry-CV.pdf` |
| Service copy, images, WhatsApp messages | `src/data/services.ts` (images in `src/data/media.ts`) |
| Portfolio projects (name, description, 3–5 images) | `src/data/portfolio.ts` |
| Core stack icons | `src/data/techStack.ts` |
| Colours and fonts | `@theme` block in `src/styles/index.css` |

All images are registered in `src/data/media.ts`.

## Notes

- The Contact form never sends anything: it validates, builds a message and opens `wa.me` with the text pre-filled.
- The four portfolio projects are example/concept work. Their screenshots were generated with `tools/mock-sites.mjs` + `tools/capture.mjs` (dev tooling only, uses `sharp`).
- Routes use the History API. On a static host, configure an SPA fallback to `index.html` (`public/_redirects` covers Netlify/Cloudflare Pages).
