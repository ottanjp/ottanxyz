import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
  input: 'assets/js/index.js',
  output: {
    file: 'static/admin/index.js',
    format: 'esm',
  },
  plugins: [resolve({ preferBuiltins: true }), commonjs(), builtins(), json()],
};
