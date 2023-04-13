import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const getPath = (url: string) => path.resolve(__dirname, url);

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      WindiCSS(),
      createSvgIconsPlugin({
        iconDirs: [getPath('src/assets')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        src: getPath('src'),
      },
    },
    server: {
      port: 3333,
      open: true,
    },
  };
});
