/*
 * Convert tsconfig.paths to Jest.moduleNameMapper
 *
 * Jest documentation: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
 */

import { getTSConfig, escapeRegExp } from '../utils/ts-config-paths'

interface JestModuleResolverConfig {
  rootDir: string
  moduleNameMapper: Record<string, string>
}

export const getJestModuleNameMapper = (
  tsConfigPath: string
): JestModuleResolverConfig => {
  const tsConfig = getTSConfig(tsConfigPath)

  return {
    rootDir: tsConfig.baseUrl,
    moduleNameMapper: Object.keys(tsConfig.paths).reduce(
      (acc: Record<string, string>, curr: string) => {
        const valueArray = tsConfig.paths[curr]

        if (!Array.isArray(valueArray) || valueArray.length !== 1) {
          // prettier-ignore
          throw new Error(`paths should be an array with exactly one element for mapping to work.\n Check value of: ${curr}`);
        }

        const [value] = valueArray
        const source = escapeRegExp(curr).replace(/\/\*/, '(/?.*)')
        const path = `<rootDir>/'${value.replace(/\/?\*/, '$1')}`
        acc[source] = path

        return acc
      },
      {}
    ),
  }
}
