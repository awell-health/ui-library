const path = require('path')

const buildEslintCommand = (filenames) =>
  `yarn lint:js:file --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  // Eslint on Typescript files
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  // Stylelint on scss files
  '*.scss': (filenames) =>
    `yarn stylelint --fix ${filenames.join(' ')}`,
  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}