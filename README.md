# Module Name Mapper

Convert your `tsconfig.json` paths to the most common module name mappers.

## Installation

Installing `module-name-mapper` only takes a single command and you're ready to roll:

```
# with npm
npm install module-name-mapper --save-dev

# with yarn
yarn add module-name-mapper -D
```

## Usage

```
import { getBabelModuleNameMapper, getJestModuleNameMapper } from 'module-name-mapper';
```

## Supported Plugins

- Babel: [Module Resolver](https://github.com/tleunen/babel-plugin-module-resolver)
- Jest: [ModuleNameMapper](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring)

### Babel

```js
// babel.config.js

const { getBabelModuleNameMapper } = require('module-name-mapper')

module.exports = function(api) {
  api.cache(true);

  return {
    ...
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        getBabelModuleNameMapper('./tsconfig.json'),
      ],
    ],
    ...
  }
}
```

### Jest

```ts
// jest.config.ts
import { getJestModuleNameMapper } from 'module-name-mapper'

module.exports = {
  ...
  rootDir: getJestModuleNameMapper('./tsconfig.json').rootDir,
  moduleNameMapper: getJestModuleNameMapper('./tsconfig.json').moduleNameMapper,
  ...
}
```
