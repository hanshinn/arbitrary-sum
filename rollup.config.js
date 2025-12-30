// rollup.config.js
import terser from '@rollup/plugin-terser';

const name = 'arbitrary';

export default [
  // ESM 输出
  {
    input: 'index.js',
    output: {
      file: 'dist/arbitrary-sum.mjs',
      format: 'es'
    },
    plugins: [terser()]
  },
  // CommonJS 输出
  {
    input: 'index.js',
    output: {
      file: 'dist/arbitrary-sum.js',
      format: 'cjs'
    },
    plugins: [terser()]
  },
  // UMD 输出（用于 <script> 标签）
  {
    input: 'index.js',
    output: {
      file: 'dist/arbitrary-sum.min.js',
      format: 'umd',
      name: name,
      globals: {}
    },
    plugins: [terser()]
  }
];