# UI-library

UI components to be used for integrating with Awell Health products.

## Environment variables

To set up your local development environment, more specifically automated generation of types based on our API, you need to configure the below two variables in your `.env` file which should exist at the root of the repository.

```
CODEGEN_AWELL_API_URL=
CODEGEN_AWELL_API_KEY=
```

## Preview components in storybook

`yarn storybook`

## Develop on local with [yalc](https://github.com/wclr/yalc)

### Install

`yarn global add yalc`

### Build (in ui-library)

`yarn build`

Note: before running the build commmand, you need to update the version in `package.json` manually. You can chose any version you like, it just need to make sense and be a different version than it was.

### Publish (in ui-library)

`yalc publish`

### Use in other project

`yalc add <package-name>`

## How to use it in your project

### Import styles in root directory

```
 import '@awell_health/ui-library/dist/index.css'
```

### Use ThemeProvider

Make sure to wrap the application with the `ThemeProvider`. This will make sure all styles are properly loaded.

### Use components

```
 import { ConversationalForm } from '@awell_health/ui-library'

 (...)
 return <ConversationalForm (...) />

```

## Possible known issues

### Empty SCSS file

#### Following error

```
[!] (plugin rollup-plugin-sass) TypeError: Cannot read properties of undefined (reading 'then')
src/atoms/message/message.module.scss
TypeError: Cannot read properties of undefined (reading 'then')
at /Users/katarzynamarciniszyn/Desktop/ui-library/node_modules/rollup-plugin-sass/dist/index.js:132:17
at transform (/Users/katarzynamarciniszyn/Desktop/ui-library/node_modules/rollup/dist/shared/rollup.js:22042:16)
at ModuleLoader.addModuleSource (/Users/katarzynamarciniszyn/Desktop/ui-library/node_modules/rollup/dist/shared/rollup.js:22267:30)
```

#### Solution

Fill up the file with css or remove it.
