import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const BASE_PATH = '/';

export default defineConfig({
  site: 'https://CalebHellmund.github.io',
  base: BASE_PATH,
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  output: 'static',
});