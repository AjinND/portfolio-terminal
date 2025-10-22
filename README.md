# portfolio-terminal

A simple portfolio website styled to look like a terminal. Built with Next.js (App Router) and Tailwind CSS.

This repository contains a small personal portfolio that mimics a terminal interface where visitors can type commands to view about information, projects, and contact details.

## Features

- Terminal-like UI and keyboard-driven navigation
- Responsive layout
- Projects list and links to source/deployments
- Lightweight and easy to customize

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS

## Getting started

Prerequisites: Node.js (>= 16) and npm, yarn, or pnpm.

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

- `app/` - Next.js App Router pages and global styles
	- `page.tsx` - Main page (terminal UI)
	- `layout.tsx` - Global layout
	- `globals.css` - Tailwind and global styles
- `public/` - Static assets
- `src/hooks/` - Custom hooks (e.g., input history handling)

## Customize

- Edit the project list and content inside the app pages to update projects and text shown in the terminal UI.
- Tailwind configuration is available in `tailwind.config.ts`.

## Deployment

This project is ready for deployment to Vercel or any hosting that supports Next.js. Follow Vercel's quick deploy flow or use the Next.js build steps.
