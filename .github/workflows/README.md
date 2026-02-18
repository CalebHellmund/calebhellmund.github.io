# Portfolio & Blog — Astro + Tailwind

A personal portfolio and blog built with Astro 4, Tailwind CSS, and TypeScript.

## Features

- ⚡ Zero-JS by default (Astro static output)
- 📝 Markdown blog with Content Collections
- 🔍 Client-side search and tag filtering
- 🌙 Dark mode with `localStorage` persistence
- 🔗 Project ↔ Blog linking system
- 📡 RSS feed + Sitemap
- 🚀 Deployable to GitHub Pages

## Quick Start
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

1. **Personal info**: Edit `src/data/siteConfig.ts`
2. **Projects**: Edit `src/data/projects.ts`
3. **Resume**: Edit `src/data/resume.ts`
4. **Blog posts**: Add `.md` files to `src/content/blog/`
5. **GitHub Pages base path**: Update `base` in `astro.config.mjs`

## Deployment to GitHub Pages

1. Update `site` and `base` in `astro.config.mjs`
2. Push to `main` branch
3. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)

The included workflow (`.github/workflows/deploy.yml`) handles the rest automatically.

## Adding Blog Posts

Create `src/content/blog/my-post.md`:
```md
---
title: "My Post Title"
description: "A short description"
date: 2024-04-01
tags: ["tag1", "tag2"]
relatedProjects: ["project-slug"]
---

Your content here...
```

## Adding Projects

Edit `src/data/projects.ts` and add an entry to the `projects` array.

## Images

Place images in `public/images/` and reference them as `/images/filename.png`.

Replace `public/resume.pdf` with your actual resume PDF.