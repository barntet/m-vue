import pag from './package.json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: pag.main,
    },
    {
      format: 'es',
      file: pag.module,
    },
  ],

  plugins: [typescript()],
};
