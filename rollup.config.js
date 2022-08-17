import pkg from './package.json'
import typescript from '@rollup/plugin-typescript';

export default {
	// 入口
	input: './src/index.ts',
	output: [
		// 1. cjs -> commonjs(nodejs规范)
		// 2. esm -> 标准化的一个模块规范
		{
			format: 'cjs',
			file: pkg.main,
		},
		{
			format: 'es',
			file: pkg.module,
		},
	],

	plugins: [typescript()],
};
