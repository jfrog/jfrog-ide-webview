import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import { terser } from 'rollup-plugin-terser';
import image from 'rollup-plugin-img';
import json from '@rollup/plugin-json';
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import babel from 'rollup-plugin-babel'
import nodePolyfills from 'rollup-plugin-polyfill-node';

const plugins = [
  peerDepsExternal(),
  resolve(),
  image({
    extensions: /\.(png|jpg|jpeg|gif|svg)$/,
    limit: 8192,
    exclude: 'node_modules/**'
  }),
  postcss({
    minimize: true
  }),
  json(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
  }),
  babel({
    exclude: "node_modules/**"
  }),
  nodePolyfills(),
  terser(),
];

const config = [
  {
    input: ['src/index.ts'],
    inlineDynamicImports: true,
    output: [
      {
        file: "dist/cjs/index.js",
        format: 'esm',
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins,
    external: ['react', 'react-dom'],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];

export default config