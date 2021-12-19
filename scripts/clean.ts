import { resolve } from 'path'
import rimraf from 'rimraf'
import { targets } from './targets'

export function clean(pkg?: string) {
  if (pkg === undefined) {
    console.error('No package given! Please specify a package to clean!')
    return 1
  }

  const current = `Clean ${pkg}`
  console.time(current)

  const glob = `{${Object.keys(targets).join(',')}}`
  const pkgGlob = resolve(__dirname, '..', pkg, glob)

  rimraf(pkgGlob, (error) => {
    if (error) {
      console.error(error)
      return 1
    }
  })

  console.timeEnd(current)
  return 0
}

if (require.main === module) process.exitCode = clean(...process.argv.slice(2))
