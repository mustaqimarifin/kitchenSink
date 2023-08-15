import { Options, defineConfig } from 'tsup';
import pkg from './package.json' assert { type: 'json' };

const baseConfig: Options = {
  entry: ['src/index.ts'],
  external: [
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  target: 'esnext',
  platform: 'node',
  format: ['esm', 'cjs'],
  //splitting: true,
  //treeshake: true,
  shims: false,
  dts: true,
};

export default defineConfig([
  /*   {
    ...baseConfig,
    outDir: 'build/dev',
    minify: false,
    sourcemap: false
  }, */
  {
    ...baseConfig,
    outDir: 'dist',
    minify: false,
    sourcemap: false,
  },
]);
