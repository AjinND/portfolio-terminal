# portfolio-terminal

A modern, highly interactive personal portfolio website. Built with Next.js (App Router), Tailwind CSS, Framer Motion, and GSAP.

This repository contains a single-page portfolio layout featuring a glassmorphism design system, integrated 3D particle backgrounds, animated components, and responsive sections for projects, skills, and professional experience.

## Features

- Modern UI with Framer Motion animations and GSAP scrolling effects
- Interactive 3D particle background using React Three Fiber
- Responsive Layout (Mobile First approach)
- Custom cursor implementation and Theme Toggle (Dark/Light mode)
- Componentized architecture for easy updates and scalable sections

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion & GSAP
- React Three Fiber (3D Elements)
- Zustand (Global State)

## Getting started

Prerequisites: Node.js (>= 18) and npm, yarn, or pnpm.

1. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

2. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Build for production

```bash
npm run build
npm run start
```

## Project structure (important files)

- `src/app/` - Next.js App Router pages and global styles
	- `page.tsx` - Main page rendering the site architecture
	- `layout.tsx` - Global layout and providers configurations
	- `globals.css` - Tailwind and global styles
- `src/components/` - Reusable UI components
	- `layout/` - Shell structural elements (Navbar, Footer, SmoothScroll, Cursor)
	- `sections/` - Primary page sections (Hero, About, Experience, Projects)
	- `ui/` - Abstracted UI elements (ThemeToggle)
	- `canvas/` - WebGL and 3D implementations
- `src/data/content.ts` - Centralized JSON data store used for populating portfolio texts and lists
- `public/` - Static assets


## Customize

- Edit the project list and content inside the app pages to update projects and text shown in the terminal UI.
- Tailwind configuration is available in `tailwind.config.ts`.

## Deployment

This project is ready for deployment to Vercel or any hosting that supports Next.js. Follow Vercel's quick deploy flow or use the Next.js build steps.
