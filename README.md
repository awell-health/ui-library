# ui-library

UI components to be used for integrating with Awell Health products.

#### Preview components in storybook
`yarn storybook`

## Develop on local with [yalc](https://github.com/wclr/yalc)

#### Install
`yarn global add yalc`

#### Build (in ui-library)
`yarn build`

#### Publish (in ui-library)
`yalc publish`

#### Use in other project
`yalc add <package-name>`


# How to use it in your project 

#### Import styles in root directory
```
 import '@awell_health/ui-library/dist/index.css'
```

#### Use components
```
 import { WizardForm } from '@awell_health/ui-library'
  
 (...)
 return <WizardForm (...) />  

```



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
