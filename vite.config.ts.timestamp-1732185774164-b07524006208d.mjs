// vite.config.ts
import react from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Auth/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig, loadEnv } from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Auth/node_modules/vite/dist/node/index.js";
import checker from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Auth/node_modules/vite-plugin-checker/dist/esm/main.js";
import istanbul from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Auth/node_modules/vite-plugin-istanbul/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\ymijs\\OneDrive\\Documents\\Internship\\LNCO Graasp\\Auth";
var config = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const shouldOpen = process.env.BROWSER && process.env.BROWSER !== "none";
  return defineConfig({
    base: "",
    server: {
      port: parseInt(process.env.VITE_PORT || "3001", 10),
      open: shouldOpen,
      watch: {
        ignored: ["**/coverage/**", "**/cypress/downloads/**"]
      }
    },
    preview: {
      port: parseInt(process.env.VITE_PORT || "3001", 10),
      open: shouldOpen
    },
    build: {
      outDir: "build",
      sourcemap: true
    },
    plugins: [
      mode === "test" ? (
        // in test mode we instrument the code
        istanbul({
          include: "src/*",
          exclude: ["node_modules", "test/"],
          extension: [".js", ".ts", ".tsx"],
          cypress: true,
          forceBuildInstrument: true
        })
      ) : (
        // in dev mode we run the checker
        checker({
          typescript: true,
          eslint: { lintCommand: 'eslint "./**/*.{ts,tsx}"' }
        })
      ),
      react()
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    }
  });
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5bWlqc1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcSW50ZXJuc2hpcFxcXFxMTkNPIEdyYWFzcFxcXFxBdXRoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5bWlqc1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcSW50ZXJuc2hpcFxcXFxMTkNPIEdyYWFzcFxcXFxBdXRoXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy95bWlqcy9PbmVEcml2ZS9Eb2N1bWVudHMvSW50ZXJuc2hpcC9MTkNPJTIwR3JhYXNwL0F1dGgvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cIi4vc3JjL2Vudi5kLnRzXCIvPlxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IFVzZXJDb25maWdFeHBvcnQsIGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XG5pbXBvcnQgaXN0YW5idWwgZnJvbSAndml0ZS1wbHVnaW4taXN0YW5idWwnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuY29uc3QgY29uZmlnID0gKHsgbW9kZSB9OiB7IG1vZGU6IHN0cmluZyB9KTogVXNlckNvbmZpZ0V4cG9ydCA9PiB7XG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xuXG4gIC8vIHRoaXMgZGVmaW5lcyBpZiB3ZSBzaG91bGQgYXV0b21hdGljYWxseSBvcGVuIHRoZSBicm93c2VyXG4gIGNvbnN0IHNob3VsZE9wZW4gPSBwcm9jZXNzLmVudi5CUk9XU0VSICYmIHByb2Nlc3MuZW52LkJST1dTRVIgIT09ICdub25lJztcblxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBiYXNlOiAnJyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlZJVEVfUE9SVCB8fCAnMzAwMScsIDEwKSxcbiAgICAgIG9wZW46IHNob3VsZE9wZW4sXG4gICAgICB3YXRjaDoge1xuICAgICAgICBpZ25vcmVkOiBbJyoqL2NvdmVyYWdlLyoqJywgJyoqL2N5cHJlc3MvZG93bmxvYWRzLyoqJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgcG9ydDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuVklURV9QT1JUIHx8ICczMDAxJywgMTApLFxuICAgICAgb3Blbjogc2hvdWxkT3BlbixcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBtb2RlID09PSAndGVzdCdcbiAgICAgICAgPyAvLyBpbiB0ZXN0IG1vZGUgd2UgaW5zdHJ1bWVudCB0aGUgY29kZVxuICAgICAgICAgIGlzdGFuYnVsKHtcbiAgICAgICAgICAgIGluY2x1ZGU6ICdzcmMvKicsXG4gICAgICAgICAgICBleGNsdWRlOiBbJ25vZGVfbW9kdWxlcycsICd0ZXN0LyddLFxuICAgICAgICAgICAgZXh0ZW5zaW9uOiBbJy5qcycsICcudHMnLCAnLnRzeCddLFxuICAgICAgICAgICAgY3lwcmVzczogdHJ1ZSxcbiAgICAgICAgICAgIGZvcmNlQnVpbGRJbnN0cnVtZW50OiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgIDogLy8gaW4gZGV2IG1vZGUgd2UgcnVuIHRoZSBjaGVja2VyXG4gICAgICAgICAgY2hlY2tlcih7XG4gICAgICAgICAgICB0eXBlc2NyaXB0OiB0cnVlLFxuICAgICAgICAgICAgZXNsaW50OiB7IGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi8qKi8qLnt0cyx0c3h9XCInIH0sXG4gICAgICAgICAgfSksXG4gICAgICByZWFjdCgpLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixTQUEyQixjQUFjLGVBQWU7QUFDeEQsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sY0FBYztBQUxyQixJQUFNLG1DQUFtQztBQVF6QyxJQUFNLFNBQVMsQ0FBQyxFQUFFLEtBQUssTUFBMEM7QUFDL0QsVUFBUSxNQUFNLEVBQUUsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBRTtBQUdoRSxRQUFNLGFBQWEsUUFBUSxJQUFJLFdBQVcsUUFBUSxJQUFJLFlBQVk7QUFFbEUsU0FBTyxhQUFhO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhLFFBQVEsRUFBRTtBQUFBLE1BQ2xELE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFNBQVMsQ0FBQyxrQkFBa0IseUJBQXlCO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWEsUUFBUSxFQUFFO0FBQUEsTUFDbEQsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxRQUVMLFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFNBQVMsQ0FBQyxnQkFBZ0IsT0FBTztBQUFBLFVBQ2pDLFdBQVcsQ0FBQyxPQUFPLE9BQU8sTUFBTTtBQUFBLFVBQ2hDLFNBQVM7QUFBQSxVQUNULHNCQUFzQjtBQUFBLFFBQ3hCLENBQUM7QUFBQTtBQUFBO0FBQUEsUUFFRCxRQUFRO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixRQUFRLEVBQUUsYUFBYSwyQkFBMkI7QUFBQSxRQUNwRCxDQUFDO0FBQUE7QUFBQSxNQUNMLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBQ0EsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
