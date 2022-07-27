# ui-library

Kit with ui components

#### Preview components in storybook
`yarn storybook`



# Possible known issues
## Empty SCSS file

#### Following error:
```
[!] (plugin rollup-plugin-sass) TypeError: Cannot read properties of undefined (reading 'then')
src/atoms/message/message.module.scss
TypeError: Cannot read properties of undefined (reading 'then')
at /Users/katarzynamarciniszyn/Desktop/ui-library/node_modules/rollup-plugin-sass/dist/index.js:132:17
at transform (/Users/katarzynamarciniszyn/Desktop/ui-library/node_modules/rollup/dist/shared/rollup.js:22042:16)
at ModuleLoader.addModuleSource (/Users/katarzynamarciniszyn/Desktop/ui-library/node_modules/rollup/dist/shared/rollup.js:22267:30)
```

#### Solution:
Fill up the file with css or remove it.