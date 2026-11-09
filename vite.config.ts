import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fonts } from './vite/tasks/fonts';
import { fontStyle } from './vite/tasks/fontsStyle';

// 🔹 Сначала конвертируем шрифты перед dev/build
fonts('./public/fonts');

export default defineConfig(({ command }) => {
  const isProd = command === 'build';

  return {
    plugins: [react(), fontStyle()],
    base: './',
    server: {
      open: true,
    },
    css: {
      devSourcemap: true, // карты SCSS → CSS в dev
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: !isProd, // карты отключены в Production
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          // about: resolve(__dirname, 'page/about.html'),
          // contacts: resolve(__dirname, 'page/contacts.html'),
        },
      },
    },
  };
});
