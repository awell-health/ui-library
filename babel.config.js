module.exports = {
  retainLines: true,
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: '3.6',
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-namespace-from',
    ['babel-plugin-styled-components', { pure: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['module-resolver', { alias: { packages: './src' } }],
    'react-css-modules',
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            corejs: '3.6',
            targets: { node: 'current' },
          },
        ],
      ],
    },
    production: {
      plugins: [
        'transform-react-remove-prop-types',
        ['react-remove-properties', { properties: ['data-testid'] }],
      ],
    },
  },
}