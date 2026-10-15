import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps every asset path relative, so the build works on
// username.github.io/<any-repo-name>/ without editing anything.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['gsap', '@gsap/react', 'lenis'],
        },
      },
    },
  },
})
