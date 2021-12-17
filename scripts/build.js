'use strict'

const { writeFileSync, mkdirSync } = require('fs')
const { resolve, basename } = require('path')
const babel = require('@babel/core')
const glob = require('glob')

const root = resolve(__dirname, '..')
const { workspaces } = require(`${root}/package.json`)

const source = 'src/**/*.{ts,tsx}'
const endings = {
  browser: 'mjs',
  development: 'cjs', // node
}

const babelEnv = process.env.BABEL_ENV || 'development'

if (!Object.keys(endings).includes(babelEnv)) {
  console.error(`Unknown babel env: ${babelEnv}`)
  return
}

const title = `Compile ${babelEnv}`
console.time(title)

workspaces.forEach((workspace) => {
  glob(`${root}/${workspace}`, (workspaceError, matches) => {
    if (workspaceError) {
      console.error(workspaceError)
      return
    }

    matches.forEach((pkg) => {
      const dest = `${pkg}/dist`
      mkdirSync(dest, { recursive: true })
      glob(`${pkg}/${source}`, (sourceError, files) => {
        if (sourceError) {
          console.error(sourceError)
          return
        }

        files.forEach((file) => {
          babel.transformFile(file, (babelError, result) => {
            if (babelError) {
              console.error(babelError)
              return
            }

            const fileParts = basename(file).split('.')
            fileParts[fileParts.length - 1] = endings[babelEnv]
            const fileName = fileParts.join('.')

            writeFileSync(`${dest}/${fileName}`, result.code)

            // well... https://github.com/babel/babel/issues/5261
            if (!result.map) {
              writeFileSync(`${dest}/${fileName}.map`, result.map)
            }
          })
        })
      })
    })
  })
})

console.timeEnd(title)
