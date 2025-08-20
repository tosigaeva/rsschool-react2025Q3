import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      exclude: ['**/*.d.ts'],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
    environment: 'jsdom',
    exclude: ['node_modules', 'dist'],
    globals: true,
    silent: true,
    slowTestThreshold: 500,
    testTimeout: 15000,
  },
});
