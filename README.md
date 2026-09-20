# sample-portfolio

Modern dark-themed personal portfolio built with:

- Next.js (App Router + TypeScript)
- Tailwind CSS
- Three.js
- GSAP + ScrollTrigger

## Features

- Hero section with interactive 3D wireframe background
- Scroll-driven 3D motion through About, Skills, Projects, Contact sections
- Glassmorphism cards for skills and project highlights
- Responsive layout optimized for desktop and mobile
- Modular component structure for production-ready maintenance

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  PortfolioExperience.tsx
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Notes

- Three.js canvas and GSAP animations run client-side in `components/PortfolioExperience.tsx`.
- Scroll-linked animation is handled using GSAP `ScrollTrigger`.
