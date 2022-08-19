module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
}
