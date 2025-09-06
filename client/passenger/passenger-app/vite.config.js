import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Force JSX to compile (avoid accidental "preserve")
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  }
})
