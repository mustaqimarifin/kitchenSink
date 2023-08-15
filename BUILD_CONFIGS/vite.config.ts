import path from 'path'
import ts2 from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'
//import packageJson from './package.json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import copy from 'rollup-plugin-copy'
import rollupReplace from '@rollup/plugin-replace'
import { resolve } from 'path'
import { readFileSync } from 'fs'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
global['__filename'] = __filename

const replace = (opts) => {
  return rollupReplace({
    ...opts,
    preventAssignment: true,
  })
}

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

const external = ['vscode-oniguruma', 'vscode-textmate']
const globals = {
  'vscode-oniguruma': 'vscode-oniguruma',
  'vscode-textmate': 'vscode-textmate',
}

const getPKG = () => {
  return pkg.name
}

const getPackageNameCamelCase = () => {
  try {
    return getPKG().replace(/-./g, (char) => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

const fileName = {
  es: `${getPKG()}.js`,
  cjs: `${getPKG()}.cjs`,
  //iife: `${getPKG()}.iife.js`,
}

const formats = Object.keys(fileName) as Array<keyof typeof fileName>

export default defineConfig({
  //base: './',

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: getPackageNameCamelCase(),
      formats,
      fileName: (format) => fileName[format],
    },
    rollupOptions: {
      external: ['vscode-oniguruma', 'vscode-textmate'],
      output: {
        globals,
      },
    },
    outDir: 'dist',
    minify: true,
  },
  ssr: {
    external: ['vscode-oniguruma', 'vscode-textmate'],
  },
  plugins: [
    /*     {
      ...typescript2(),
      apply: 'build',
    }, */
    // tits(),

    //dts(),
    copy({
      targets: [
        {
          src: resolve('node_modules/vscode-oniguruma/release/onig.wasm'),

          dest: 'dist',
        },
      ],
    }),
    /*     replace({
      __CDN_ROOT__: '',
      __BROWSER__: JSON.stringify(false),
    }),
    nodeResolve(),
    commonjs(), */
  ],
})

/* // vite.config.js

export default defineConfig([
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
      },
    ],
    plugins: [],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.browser.mjs',
      format: 'esm',
      globals,
    },
    plugins: [
      replace({
        __BROWSER__: JSON.stringify(true),
        __CDN_ROOT__: '',
      }),
      esbuild(),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.unpkg.iife.js',
      format: 'iife',
      name: 'shiki',
      extend: true,
      globals,
    },
    plugins: [
      replace({
        __BROWSER__: JSON.stringify(true),
        __CDN_ROOT__: `https://unpkg.com/shiki@${pkg.version}/`,
      }),
      esbuild(),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.jsdelivr.iife.js',
      format: 'iife',
      name: 'shiki',
      extend: true,
      globals,
    },
    plugins: [
      replace({
        __BROWSER__: JSON.stringify(true),
        __CDN_ROOT__: `https://cdn.jsdelivr.net/npm/shiki@${pkg.version}/`,
      }),
      esbuild(),
      nodeResolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      dts(),
      copy({
        targets: [
          {
            src: resolve('node_modules/vscode-oniguruma/release/onig.wasm'),
            dest: 'dist',
          },
        ],
      }),
    ],
    onwarn: (warning, warn) => {
      if (!/Circular/.test(warning.message)) {
        warn(warning)
      }
    },
  },
]) */
