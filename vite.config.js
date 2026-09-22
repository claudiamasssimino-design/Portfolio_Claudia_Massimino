import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Portfolio_Claudia_Massimino/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}));
