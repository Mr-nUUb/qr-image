/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const fs = require('fs')
const path = require('path')

const qrImage = require('@mr-nuub/qr-image')
const homepage = require('../../package.json').homepage

const outputPath = path.resolve(__dirname, 'output')

if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath)

// select output format and customize EC level, margin and size
fs.writeFileSync(
  path.resolve(outputPath, 'homepage.custom.png'),
  qrImage.getQRImage(homepage, { type: 'png', ecLevel: 'H', margin: 1, size: 9 }),
)

// other supported formats
fs.writeFileSync(path.resolve(outputPath, 'homepage.eps'), qrImage.getEPS(homepage))
fs.writeFileSync(path.resolve(outputPath, 'homepage.pdf'), qrImage.getPDF(homepage))
fs.writeFileSync(path.resolve(outputPath, 'homepage.png'), qrImage.getPNG(homepage))
fs.writeFileSync(path.resolve(outputPath, 'homepage.svg'), qrImage.getSVG(homepage))

// we even offer the possibility to output a raw JSON object (2D array of 0|1) for custom processing
fs.writeFileSync(path.resolve(outputPath, 'homepage.json'), JSON.stringify(qrImage.getQR(homepage)))
