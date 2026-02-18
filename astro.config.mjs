import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Set this to your GitHub repo name, e.g. '/my-portfolio'
// For a user/org site (username.github.io), use '/'
const BASE_PATH = '/';

export default defineConfig({
  site: 'https://CalebHellmund.github.io',
  base: BASE_PATH,
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  output: 'static',
});