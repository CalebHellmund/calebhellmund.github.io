---
title: "Building a Portfolio Site with Astro 4"
description: "A practical guide to building a fast, SEO-friendly personal portfolio and blog using Astro, Tailwind CSS, and Content Collections."
date: 2023-12-05
tags: ["Astro", "Web Dev", "Tutorial", "TypeScript"]
image: "/images/blog-astro.png"
imageAlt: "Astro framework logo"
relatedProjects: []
---

# Building a Portfolio Site with Astro 4

Astro has become my go-to framework for content-heavy sites. It ships zero JavaScript by default, has first-class Markdown support, and integrates beautifully with Tailwind CSS. Let me walk you through building a portfolio from scratch.

## Why Astro?

- **Zero JS by default** — pages are static HTML unless you opt in with `client:` directives
- **Island architecture** — interactive components hydrate independently
- **Content Collections** — type-safe Markdown with schema validation
- **Framework agnostic** — use React, Svelte, Vue, or plain HTML in the same project

## Project Setup
```bash
# Create project
npm create astro@latest my-portfolio -- --template minimal --typescript strict

# Add integrations
npx astro add tailwind mdx sitemap
```

## Content Collections

Define your schema once in `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Then query posts with full type safety:
```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
const sorted = posts.sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
```

## Dynamic Routes

For blog post pages, create `src/pages/blog/[slug].astro`:
```typescript
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props:  { post },
  }));
}
```

## View Transitions

Add smooth page transitions with one import:
```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

## Deployment

Build for GitHub Pages by setting `site` and `base` in `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/my-portfolio',
  integrations: [tailwind(), mdx(), sitemap()],
  output: 'static',
});
```

Then push to a `gh-pages` branch — GitHub Actions makes this automatic.

---

Astro's ergonomics, combined with its performance-first philosophy, make it an excellent choice for any developer building their online presence. The learning curve is gentle if you already know HTML and JavaScript, and the payoff — near-perfect Lighthouse scores out of the box — is very satisfying.