import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { getQRImage } from '../../src/main'
import { getQR } from '../../src/base'
import { getEPS } from '../../src/eps'
import { getPDF } from '../../src/pdf'
import { getPNG } from '../../src/png'
import { getSVG } from '../../src/svg'
import { homepage } from '../../package.json'

const outputPath = resolve(__dirname, 'output')

if (!existsSync(outputPath)) mkdirSync(outputPath)

// select output format and customize EC level, margin and size
writeFileSync(
  resolve(outputPath, 'homepage.custom.png'),
  getQRImage(homepage, { type: 'png', ecLevel: 'H', margin: 1, size: 9 }) as Buffer,
)

// other supported formats
writeFileSync(resolve(outputPath, 'homepage.eps'), getEPS(homepage))
writeFileSync(resolve(outputPath, 'homepage.pdf'), getPDF(homepage))
writeFileSync(resolve(outputPath, 'homepage.png'), getPNG(homepage))
writeFileSync(resolve(outputPath, 'homepage.svg'), getSVG(homepage))

// we even offer the possibility to output a raw JSON object (2D array of 0|1) for custom processing
writeFileSync(resolve(outputPath, 'homepage.json'), JSON.stringify(getQR(homepage)))
