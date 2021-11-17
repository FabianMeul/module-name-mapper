/*
 * Convert tsconfig.paths to Babel Module Resolver Config
 *
 * Babel documentation: https://github.com/tleunen/babel-plugin-module-resolver/blob/master/DOCS.md
 */

import { getTSConfig } from '../utils/ts-config-paths'

interface BabelModuleResolverConfig {
  root: string[]
  alias: Record<string, string>
}

function replaceWildCard(value: string): string {
  return value.replace(/\/\*/, '')
}

export const getBabelModuleNameMapper = (
  tsConfigPath: string
): BabelModuleResolverConfig => {
  const tsConfig = getTSConfig(tsConfigPath)

  return {
    root: [tsConfig.baseUrl],
    alias: Object.keys(tsConfig.paths).reduce(
      (acc: Record<string, string>, curr: string) => {
        const valueArray = tsConfig.paths[curr]

        if (!Array.isArray(valueArray) || valueArray.length !== 1) {
          // prettier-ignore
          throw new Error(`paths should be an array with exactly one element for mapping to work.\n Check value of: ${curr}`);
        }

        const [value] = valueArray
        const source = replaceWildCard(curr)
        const path = replaceWildCard(value)
        acc[source] = path

        return acc
      },
      {}
    ),
  }
}
