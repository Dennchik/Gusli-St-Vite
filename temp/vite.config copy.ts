import { defineConfig, type ViteDevServer } from 'vite';
import type { Plugin } from 'vite'; // ✅ только тип
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';
import ttf2woff from 'ttf2woff';
import ttf2woff2 from 'ttf2woff2';

// 🔹 Конвертация одного TTF/OTF файла в WOFF + WOFF2
function convertFont(filePath: string, outDir: string) {
  const ext = path.extname(filePath).toLowerCase();
  let fontData: Buffer;

  // OTF → TTF (если нужен, можно добавить конвертацию OTF → TTF отдельно)
  if (ext === '.otf') {
    console.warn(
      `⚠ OTF шрифты пока не конвертируются автоматически: ${filePath}`
    );
    return;
  } else if (ext === '.ttf') {
    fontData = fs.readFileSync(filePath);
  } else {
    return; // не TTF/OTF
  }

  const basename = path.basename(filePath, ext);

  // → WOFF
  const woffBuf = Buffer.from(ttf2woff(fontData).buffer);
  fs.writeFileSync(path.join(outDir, basename + '.woff'), woffBuf);

  // → WOFF2
  const woff2Buf = ttf2woff2(fontData);
  fs.writeFileSync(path.join(outDir, basename + '.woff2'), woff2Buf);
}

// 🔹 Плагин конвертации шрифтов
function fontsConvertPlugin(): Plugin {
  return {
    name: 'fonts-converter',
    buildStart() {
      const fontsDir = path.resolve('public/fonts');
      if (!fs.existsSync(fontsDir)) return;

      const files = fs
        .readdirSync(fontsDir)
        .filter((f) => /\.(ttf|otf)$/i.test(f));

      files.forEach((file) => {
        convertFont(path.join(fontsDir, file), fontsDir);
      });

      console.log('✅ Шрифты конвертированы в public/fonts (*.woff / *.woff2)');
    },
  };
}

// 🔹 Генерация SCSS со шрифтами
function generateFontsScss() {
  const fontsDir = path.resolve('public/fonts');
  const targetFile = path.resolve('src/scss/core/_fonts.scss');

  let content = '@use "variables.scss" as *;\r\n@use "mixins.scss" as *;\r\n';

  if (fs.existsSync(fontsDir)) {
    const items = fs
      .readdirSync(fontsDir)
      .filter((f) => /\.(woff2?|ttf)$/i.test(f));
    if (items.length > 0) {
      let c_fontName = '';
      items.forEach((item) => {
        const fontName = item.split('.')[0];
        if (c_fontName !== fontName) {
          content += `@include font-face("${fontName}", "${fontName}", 400, "normal");\r\n`;
        }
        c_fontName = fontName;
      });
    }
  }

  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, content);
  console.log(`✅ _fonts.scss сгенерирован: ${targetFile}`);
}

// 🔹 Плагин генерации SCSS + HMR
function fontsStylePlugin() {
  let timeout: NodeJS.Timeout | null = null;

  return {
    name: 'fonts-style-generator',
    buildStart() {
      generateFontsScss();
    },
    configureServer(server: ViteDevServer) {
      const fontsPath = path.resolve('public/fonts');

      if (fs.existsSync(fontsPath)) {
        fs.watch(fontsPath, { persistent: true }, () => {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            generateFontsScss();
            server.ws.send({ type: 'full-reload' });
          }, 100); // задержка 100мс для предотвращения множественных вызовов
        });
      }
    },
  };
}

// 🔹 Vite config
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    plugins: [
      react(),
      fontsConvertPlugin(), // конвертация шрифтов при старте
      fontsStylePlugin(), // генерация _fonts.scss
    ],
    base: './',
    server: { open: true },
    css: { devSourcemap: true },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: !isBuild, // карты только в dev
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
  };
});
