// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取 __dirname 等价物（ESM 中没有 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 package.json（使用动态 import）
const pkgPath = join(__dirname, './package.json');
const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));

// 或者更简洁地使用 import（Node.js >= 18.17 / 20.6 支持 JSON modules）
// 注意：需在 package.json 中开启 "resolveJsonModule"（但 Rollup 配置中通常不依赖 TS）
// 所以推荐用 fs 读取

import * as fs from 'fs/promises';

// 重新定义 functionFiles（使用 await）
const getFunctionConfigs = async () => {
  const files = readdirSync('src')
    .filter(file => file !== 'index.js' && file.endsWith('.js'));

  const configs = [];
  for (const file of files) {
    configs.push({
      input: `src/${file}`,
      output: [
        // CJS 格式
        {
          file: `dist/${file}`,
          format: 'cjs',
          exports: 'default',
          plugins: [terser()],
          // sourcemap: true
        },
        // ESM 格式
        {
          file: `dist/esm/${file}`,
          format: 'es',
          plugins: [terser()],
          // sourcemap: true
        }
      ],
      plugins: [nodeResolve(), commonjs()]
    });
  }
  return configs;
};

// 主入口配置
const mainConfig = {
  input: 'src/index.js',
  output: [
    // CommonJS
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
      plugins: [terser()],
      // sourcemap: true
    },
    // ES Module
    {
      file: pkg.module,
      format: 'es',
      plugins: [terser()],
      // sourcemap: true
    },
    // UMD
    {
      file: 'dist/arbitrary-sum.min.js',
      format: 'umd',
      name: 'arbitrary',
      plugins: [terser()],
      // sourcemap: true
    }
  ],
  plugins: [nodeResolve(), commonjs()]
};

// 导出异步配置函数（Rollup 支持 async config）
export default async () => {
  const functionConfigs = await getFunctionConfigs();
  return [mainConfig, ...functionConfigs];
};