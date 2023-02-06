import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import pxtovw from 'postcss-px-to-viewport'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

const loader_pxtovw = pxtovw({
  viewportWidth: 375,
  viewportUnit: 'vw'
})

export default ({ mode }) => {
 const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: '/webmin/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    css: {
      postcss: {
        plugins: [loader_pxtovw]
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        // "^/mwebh5": {
        //   target: env.VITE_BASE_URL,
        //   changeOrigin: true,
        //   rewrite: path => path.replace('^\/mwebh5', '/mwebh5')
        // },
        "^/mwebh5": {
          target: 'http://192.168.0.118:8098',
          changeOrigin: true,
          rewrite: path => path.replace('^\/mwebh5', '/mwebh5')
        },
      }
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, './src/'),
        '@icon': path.join(__dirname, './src/assets/'),
        '@utils': path.join(__dirname, './src/utils/'),
      },
    },
  })
}


