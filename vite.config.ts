import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fitlogs',
  plugins: [
    svelte(),
    VitePWA({
      manifest: {
        // name: 'FitLogs',
        // short_name: 'FL',
        // start_url: '/',
        // display: 'standalone',
        // background_color: '#ffffff',
        // theme_color: '#000000',
        icons: [
          {
            src: 'assets/fitlogs-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
        ],
      }
    })
  ]
})
