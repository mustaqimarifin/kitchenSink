import { Options, defineConfig } from 'tsup'
import pkg from './package.json'

const baseConfig: Options = {
  entry: ['src/index.ts'],
  external: [...Object.keys(pkg.devDependencies || {})],
  target: 'esnext',
  format: ['esm', 'cjs'],
  treeshake: true,
  splitting: true,
  sourcemap: false,
  shims: false,
  dts: true,
}

export default defineConfig([
  {
    ...baseConfig,
    outDir: 'dist',
    platform: 'node',
    minify: false,
  },
/*   {
    ...baseConfig,
    outDir: 'dist',
    outExtension() {
      return {
        js: `.browser.js`,
      }
    },
    platform: 'browser',
    minify: false,
  }, */
])
