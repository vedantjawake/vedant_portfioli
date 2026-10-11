# Vedant Jawake: Portfolio (React + TypeScript + Vite)

## Run
```bash
npm install
npm run dev -- --port 3000     # open http://localhost:3000
npm run build                  # type-check + production build into dist/
```

## Edit your content
Everything lives in **src/data/portfolio.ts**: profile, skills, projects, certifications,
examinations (education) and about. Change the text there and the whole site updates.

- Marks / CGPA: add `score: '8.4 CGPA'` to any item in `examinations`.
- Photo: put `me.jpg` in `public/` and set `photo: '/me.jpg'` in `profile`.
- Resume: replace `public/Vedant_Jawake_Resume.pdf`.
- Colours and fonts: CSS variables at the top of `src/styles/global.css`.
- Contact form: validates, then opens the visitor's email app. For direct delivery,
  swap `onSubmit` in `Contact.tsx` for a call to Formspree / EmailJS / your own API.

## Structure
```
src/
  templates/   SectionTemplate, Card (spotlight), Button, Reveal (scroll animation)
  components/  Loader, CursorGlow, NeuralCanvas, Marquee, Navbar, Hero, Banner, Logo,
               Profile, Skills, Projects, Certifications, Examinations, About, Contact, Footer
  hooks/       useInView, useCountUp, useActiveSection, useTheme, useTypewriter, useScrollProgress
  data/        portfolio.ts
  styles/      global.css
public/        favicon.svg, logo.svg, banner.svg, resume PDF
```

## Extras built in
- **Ctrl/Cmd + K** command palette: jump to any section, open a link, download the resume, copy email, switch theme.
- **Code on GitHub** section loads your newest public repos live from the GitHub API
  (falls back to a saved list in `fallbackRepos` if GitHub is unreachable or rate-limited).
- Font picker (Aa button), scroll-progress back-to-top button, live India local time, copy-email toast,
  and Person structured data (JSON-LD) in `index.html` for search engines.

## Deploy (free)
1. Push this folder to a GitHub repository.
2. On vercel.com or netlify.com choose "Import project", pick the repo.
3. Build command `npm run build`, output directory `dist`. Deploy.
4. Put the live URL in your GitHub profile README (it currently has a placeholder portfolio link).
