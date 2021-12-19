import { EOL } from 'os'
import { dirname, resolve } from 'path'
import ts from 'typescript'
import { targets } from './targets'

export function compile(pkg?: string) {
  console.time('Overall')

  if (pkg === undefined) {
    console.error('No package given! Please specify a package to build!')
    return 1
  }

  const results: ts.Diagnostic[] = []

  // build for all targets
  for (const [key, value] of Object.entries(targets)) {
    const current = `Compile ${pkg}, ${key}`
    console.time(current)

    // parse config
    const parsedConfig = ts.parseJsonConfigFileContent(
      {
        extends: resolve(__dirname, value),
        compilerOptions: {
          rootDir: 'src',
          outDir: key,
        },
        include: ['src/**/*'],
      },
      ts.sys,
      pkg,
    )

    // compile and get diagnostics
    const { diagnostics } = ts
      .createProgram({
        options: parsedConfig.options,
        rootNames: parsedConfig.fileNames,
        configFileParsingDiagnostics: parsedConfig.errors,
      })
      .emit()
    results.push(...diagnostics)

    console.timeEnd(current)
  }

  // search for errors and warnings
  const messages = results.filter((d) => d.category !== ts.DiagnosticCategory.Message)

  // if nothing bad happened, return
  if (messages.length === 0) {
    console.timeEnd('Overall')
    return 0
  }

  // we srewed up, log errors and return non-zero exit code
  messages.forEach((message) => {
    console.error(
      ts.formatDiagnostic(message, {
        getCurrentDirectory: () => dirname(__dirname),
        getCanonicalFileName: (fileName) => fileName,
        getNewLine: () => EOL,
      }),
    )
  })
  return 1
}

if (require.main === module) process.exitCode = compile(...process.argv.slice(2))
