const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');

export default {
  input: 'assets/js/index.js',
  output: {
    file: 'static/admin/index.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: true }),
    commonjs({ ignore: ['conditional-runtime-dependency'] }),
    builtins(),
    json(),
  ],
};
