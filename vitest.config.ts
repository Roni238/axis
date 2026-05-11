import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true, // чтобы не импортировать describe, it, expect в каждом файле
    exclude: [
      '**/node_modules/**',
      '**/e2e/**',           // ← игнорируем e2e папку
      '**/playwright.config.js',
      '**/*.spec.js'         // (опционально) если .spec.js только для e2e
    ],
    // ВАЖНО: включаем только unit тесты
    include: [
      'tests/unit/**/*.test.ts',
      'tests/unit/**/*.test.js'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['components/Base*.vue']
    }
  }
})