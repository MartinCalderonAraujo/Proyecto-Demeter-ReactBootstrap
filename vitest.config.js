import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTest.js'],

    include: [
      'src/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      'coverage',
      'src/**/*.css',
      'src/**/*.scss',
      'src/**/*.sass',
      'src/**/*.svg',
      'src/**/*.png',
      'src/**/*.jpg'
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/**/*.jsx',
        'src/**/*.js'
      ],
      exclude: [
        'node_modules/',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/**/*.d.ts',
        'src/**/*.css',
        'src/**/*.scss',
        'src/**/*.svg'
      ]
    }
  }
})