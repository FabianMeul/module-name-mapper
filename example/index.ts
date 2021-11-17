import { getBabelModuleNameMapper ,getJestModuleNameMapper } from '../'

console.log('Babel ModuleNameMapper:', getBabelModuleNameMapper('./tsconfig.json'))
console.log('---')
console.log('Jest ModuleNameMapper:', getJestModuleNameMapper('./tsconfig.json'))