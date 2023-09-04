import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import image from '@rollup/plugin-image'
import svgr from '@svgr/rollup'
const plugins = [
	image({ dom: true }),
	typescript({
		tsconfig: './tsconfig.json',
		exclude: ['setupTests.ts']
	})
]

const config = [
	{
		input: ['src/types/index.ts'],
		inlineDynamicImports: true,
		output: [
			{
				file: 'types/index.js',
				format: 'cjs',
				sourcemap: true
			}
		],
		plugins
	},
	{
		input: 'types/types/index.d.ts',
		output: [{ file: 'types/index.d.ts', format: 'esm' }],
		plugins: [dts()]
	}
]

export default config
