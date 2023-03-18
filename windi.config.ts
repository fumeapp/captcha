import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      './**/*.{vue,ts}',
      'node_modules/tailvue/dist/tailvue.es.js',
      'node_modules/tailvue/dist/tailvue.umd.js',
    ],
  },
  plugins: [
    require('windicss/plugin/forms'),
  ],
})