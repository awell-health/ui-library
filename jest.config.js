module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@awell-health/design-system$':
      '<rootDir>/node_modules/@awell-health/design-system/dist/index.cjs.js',
  },
}
