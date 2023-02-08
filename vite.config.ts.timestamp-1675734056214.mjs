// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/project/%E5%B0%8F%E8%92%8B/h5-views/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/project/%E5%B0%8F%E8%92%8B/h5-views/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import pxtovw from "file:///E:/project/%E5%B0%8F%E8%92%8B/h5-views/node_modules/postcss-px-to-viewport/index.js";
import Components from "file:///E:/project/%E5%B0%8F%E8%92%8B/h5-views/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///E:/project/%E5%B0%8F%E8%92%8B/h5-views/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "E:\\project\\\u5C0F\u848B\\h5-views";
var loader_pxtovw = pxtovw({
  viewportWidth: 375,
  viewportUnit: "vw"
});
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "/webmin/",
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()]
      })
    ],
    css: {
      postcss: {
        plugins: [loader_pxtovw]
      }
    },
    server: {
      host: "0.0.0.0",
      port: 8080,
      proxy: {
        "^/mwebh5": {
          target: "http://192.168.0.118:8098",
          changeOrigin: true,
          rewrite: (path2) => path2.replace("^/mwebh5", "/mwebh5")
        }
      }
    },
    resolve: {
      alias: {
        "@": path.join(__vite_injected_original_dirname, "./src/"),
        "@icon": path.join(__vite_injected_original_dirname, "./src/assets/"),
        "@utils": path.join(__vite_injected_original_dirname, "./src/utils/")
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXFx1NUMwRlx1ODQ4QlxcXFxoNS12aWV3c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxccHJvamVjdFxcXFxcdTVDMEZcdTg0OEJcXFxcaDUtdmlld3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3Byb2plY3QvJUU1JUIwJThGJUU4JTkyJThCL2g1LXZpZXdzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgcHh0b3Z3IGZyb20gJ3Bvc3Rjc3MtcHgtdG8tdmlld3BvcnQnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xyXG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5cclxuY29uc3QgbG9hZGVyX3B4dG92dyA9IHB4dG92dyh7XHJcbiAgdmlld3BvcnRXaWR0aDogMzc1LFxyXG4gIHZpZXdwb3J0VW5pdDogJ3Z3J1xyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XHJcbiBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy93ZWJtaW4vJyxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxyXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbVmFudFJlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtsb2FkZXJfcHh0b3Z3XVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogODA4MCxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyBcIl4vbXdlYmg1XCI6IHtcclxuICAgICAgICAvLyAgIHRhcmdldDogZW52LlZJVEVfQkFTRV9VUkwsXHJcbiAgICAgICAgLy8gICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgLy8gICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgnXlxcL213ZWJoNScsICcvbXdlYmg1JylcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIFwiXi9td2ViaDVcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzE5Mi4xNjguMC4xMTg6ODA5OCcsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgnXlxcL213ZWJoNScsICcvbXdlYmg1JylcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjLycpLFxyXG4gICAgICAgICdAaWNvbic6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMvJyksXHJcbiAgICAgICAgJ0B1dGlscyc6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy91dGlscy8nKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG5cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxjQUFjLGVBQWU7QUFDbFQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFMN0IsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxnQkFBZ0IsT0FBTztBQUFBLEVBQzNCLGVBQWU7QUFBQSxFQUNmLGNBQWM7QUFDaEIsQ0FBQztBQUVELElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUM1QixRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3RDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVMsQ0FBQyxhQUFhO0FBQUEsTUFDekI7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFNTCxZQUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUFBLFVBQVFBLE1BQUssUUFBUSxZQUFhLFNBQVM7QUFBQSxRQUN0RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssS0FBSyxrQ0FBVyxRQUFRO0FBQUEsUUFDbEMsU0FBUyxLQUFLLEtBQUssa0NBQVcsZUFBZTtBQUFBLFFBQzdDLFVBQVUsS0FBSyxLQUFLLGtDQUFXLGNBQWM7QUFBQSxNQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
