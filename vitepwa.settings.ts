import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa';
import pkg from './package.json';

export const pwaOptions: VitePWAOptions = {
  mode: 'development',
  base: '/',
  registerType: 'autoUpdate',
  includeAssets: ['logo96.png', 'logo192.png', 'robots.txt'],
  manifest: {
    name: 'UNGUESS',
    short_name: 'UG',
    theme_color: '#003A57',
    background_color: '#1CB559',
    icons: [
      {
        src: '/icon192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    // enabled: process.env.SW_DEV === 'true',
    enabled: true,
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
  workbox: {
    cacheId: pkg.version,
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    clientsClaim: true,
    skipWaiting: true,
  },
};
