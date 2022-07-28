import { DEFAULT_EXTENSIONS } from '@babel/core'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import ts2 from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import del from 'rollup-plugin-delete'
import svg from 'rollup-plugin-svg'
import postcss from 'rollup-plugin-postcss'

export default {
  input: `src/index.ts`,
  output: [
    {
      file: 'dist/umd/index.js',
      name: '@awell_health/ui-library',
      format: 'umd',
      globals: {
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
    {
      dir: 'dist/esm', // indicate not create a single-file
      name: '@awell_health/ui-library',
      preserveModules: true,
      format: 'esm', // ES2015 modules version so consumers can tree-shake
      preserveModulesRoot: 'src', // optional but useful to create a more plain folder structure
      globals: {
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    del({ targets: 'dist/*' }),
    json(),
    svg(),
    resolve({ browser: true }),
    commonjs(),
    postcss({
      extract: true,
      autoModules: true,
      use: ['sass'],
    }),
    ts2({
      tsconfigOverride: {
        include: ['src/**/*'],
        exclude: [
          '**/*.stories.*',
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
        ],
      },
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      exclude: '../node_modules/**',
    }),
  ],
}
