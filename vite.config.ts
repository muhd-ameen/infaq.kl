import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined
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
