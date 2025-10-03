import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // so you don’t need to import describe/it/expect
    environment: 'node', // good for backend projects
    coverage: {
      reporter: ['text', 'json', 'html'], // code coverage
    },
  },
});
