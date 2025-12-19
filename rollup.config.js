// rollup.config.js
import terser from '@rollup/plugin-terser';

const name = 'arbitrary';

export default [
  // ESM 输出
  {
    input: 'index.js',
    output: {
      file: 'dist/arbitrary-sum.esm.js',
      format: 'es'
    }
  },
  // CommonJS 输出
  {
    input: 'index.js',
    output: {
      file: 'dist/arbitrary-sum.cjs.js',
      format: 'cjs'
    }
  },
  // UMD 输出（用于 <script> 标签）
  {
    input: 'index.js',
    output: {
      file: 'dist/arbitrary-sum.js',
      format: 'umd',
      name: name,
      globals: {}
    },
    plugins: [terser()] // 可选：压缩
  }
];