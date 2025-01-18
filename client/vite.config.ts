import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from "vite-plugin-compression"
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), compression()],
  build:{
    chunkSizeWarningLimit: 1000,
    rollupOptions:{
      output:{
        manualChunks(id){
          if(id.includes("node_modules")){
            return id.toString().split("node_modules/")[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
