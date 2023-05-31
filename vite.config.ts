import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/pacman3d-n/",
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: "./index.html",
                game: "./pacman.html",

            }
        }
    }

})
