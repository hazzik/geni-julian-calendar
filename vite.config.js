import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Read package.json manually to avoid import assertions issues
const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

const manifestTransform = () => {
  return {
    name: 'manifest-transform',
    generateBundle() {
      const manifestPath = resolve(__dirname, 'src/manifest.json');
      const content = fs.readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(content);
      
      manifest.version = pkg.version;
      const amoId = process.env.AMO_EXTENSION_ID;
      
      if (amoId) {
        manifest.browser_specific_settings = {
          ...manifest.browser_specific_settings,
          gecko: {
            ...manifest.browser_specific_settings.gecko,
            id: amoId
          }
        };
      }
      
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(manifest, null, 2)
      });
    }
  };
};

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Minimize to match production build expectations
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'main',
      formats: ['iife'],
      fileName: () => 'main.js'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      }
    }
  },
  plugins: [manifestTransform()]
});
