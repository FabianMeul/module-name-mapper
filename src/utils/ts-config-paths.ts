/**
 *
 * TSConfig documentation: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
 **/

import { loadSync } from 'tsconfig'

export interface TSConfig {
  baseUrl: string
  paths: Record<string, string[]>
}

export function getTSConfig(tsConfigPath: string): TSConfig {
  const { config, path } = loadSync('', tsConfigPath)

  if (!config.compilerOptions?.baseUrl) {
    // prettier-ignore
    throw new Error(`TSConfig Error: baseUrl property not found in config: ${path}`)
  }

  if (!config.compilerOptions?.paths) {
    // prettier-ignore
    throw new Error(`TSConfig Error: paths property not found in config: ${path}`)
  }

  const tsConfig: TSConfig = {
    baseUrl: config.compilerOptions.baseUrl,
    paths: config.compilerOptions.paths,
  }

  return tsConfig
}

export function escapeRegExp(text: string) {
  // Escape all special characters except '*'
  return text.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&')
}
