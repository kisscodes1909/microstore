import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://lexingtonthemes.com',
  /** Cho phép tối ưu ảnh remote trong <Image /> (hero Unsplash, v.v.) */
  image: {
    domains: ['images.unsplash.com'],
  },
  integrations: [react(), sitemap()],
});