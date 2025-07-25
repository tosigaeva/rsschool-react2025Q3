import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{js,jsx,ts,tsx}'],
            exclude: [
                'src/**/*.test.{js,jsx,ts,tsx}',
                'src/**/*.spec.{js,jsx,ts,tsx}',
                'src/index.{js,jsx,ts,tsx}',
                'src/setupTests.{js,ts}',
                'src/**/*.d.ts',
                'src/types/**'
            ],
            thresholds: {
                statements: 80,
                branches: 50,
                functions: 50,
                lines: 50
            }
        }
    }
});