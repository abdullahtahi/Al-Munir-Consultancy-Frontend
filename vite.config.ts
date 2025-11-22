import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_BASE_URL;
  
  return {
    base: '/',
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      // Handle SPA fallback for development
      historyApiFallback: true,
      proxy: {
        '/api/v1': {
          target: apiUrl || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/v1/, '')
        },
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        src: resolve(__dirname, 'src'),
        '@api': resolve(__dirname, 'src/api'),
        '@assets': resolve(__dirname, 'src/assets'),
        '@components': resolve(__dirname, 'src/components'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@routes': resolve(__dirname, 'src/routes'),
        '@services': resolve(__dirname, 'src/services'),
        '@store': resolve(__dirname, 'src/store'),
        '@theme': resolve(__dirname, 'src/theme'),
        '@types': resolve(__dirname, 'src/types'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@views': resolve(__dirname, 'src/views'),
        '@constants': resolve(__dirname, 'src/constants'),
      }
    },
    esbuild: {
      loader: 'tsx',
      include: /src\/.*\.tsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-tsx',
            setup(build) {
              build.onLoad(
                { filter: /src\\.*\.js$/ },
                async (args) => ({
                  loader: 'tsx',
                  contents: await fs.readFile(args.path, 'utf8'),
                })
              );
            },
          },
        ],
      },
    },
    plugins: [
      svgr(),
      react()
    ],
  }
});
