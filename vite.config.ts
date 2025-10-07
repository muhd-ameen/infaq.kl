import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        give: resolve(__dirname, 'give.html'),
        info: resolve(__dirname, 'info.html'),
        success: resolve(__dirname, 'success.html'),
        scan: resolve(__dirname, 'scan.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [
    // Enable HTML minification
    {
      name: 'html-minify',
      transformIndexHtml(html) {
        return html
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '><')
          .trim();
      }
    }
  ]
})
