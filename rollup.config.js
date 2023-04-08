/* eslint-disable @typescript-eslint/no-var-requires */
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const pkg = require('./package.json');
const del = require('rollup-plugin-delete');

module.exports = {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: false,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: false,
      plugins: [terser()],
      exports: 'auto',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: false,
      exports: 'auto',
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({
      // useTsconfigDeclarationDir: true,
      // clean: true,
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // sourceMaps(), // Resolve source maps to the original source
    del({
      targets: 'dist/*',
      hook: 'buildStart',
    }),
    del({
      targets: ['dist/index.test.d.ts', 'dist/index.test.d.ts.map'],
      hook: 'writeBundle',
    }),
  ],
};
