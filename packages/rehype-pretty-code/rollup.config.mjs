import commonjs from '@rollup/plugin-commonjs';
//import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import swc from '@rollup/plugin-swc';
import esbuild from 'rollup-plugin-esbuild'


/** @type {import('rollup').RollupOptions} */
const common = {
  input: './src/index.ts',
   plugins: [
    commonjs(),
    nodeResolve({ extensions: ['.ts', '.js'] }), 
    swc(),  
    esbuild({

      include: /\.[jt]sx?$/, 
      exclude: /node_modules/, 
      sourceMap: false, 
      minify: true,
      target: 'esnext',
      jsx: 'transform',
    }),
  ], 
  external: ['parse-numeric-range', 'shiki'],
};

export default defineConfig([
  {
    ...common,
    output: {
      exports: 'default',
      file: './dist/rehype-pretty-code.js',
      format: 'esm',
      
    
    },
  },
  {
    ...common,
    output: {
      exports: 'default',
      file: './dist/rehype-pretty-code.cjs',
      format: 'cjs',
    },
  },
]);

/*     "build": "esbuild src/index.ts --format=esm --loader:.ts=ts --external:parse-numeric-range shiki --platform=node --bundle --outdir=dist --tree-shaking=true --minify && tsc", */