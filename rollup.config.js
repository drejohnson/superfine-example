import fs from 'fs';
import path from 'path';
import historyApi from 'connect-history-api-fallback';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import replace from 'rollup-plugin-replace';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

export default [
  // ES module version, for modern browsers
  {
    input: 'src/app-element.js',
    output: {
      dir: 'dist/module',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        )
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      nodeBuiltins(),
      nodeResolve(),
      commonjs(),
      nodeGlobals(),
      production && terser(),
      !production &&
        browsersync({
          port: process.env.PORT || 8080,
          server: {
            baseDir: 'dist',
            middleware: [historyApi()]
          },
          open: false,
          ui: false
        })
    ],
    experimentalCodeSplitting: true,
    inlineDynamicImports: true
  }
];
