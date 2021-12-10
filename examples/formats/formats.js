/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const fs = require('fs')
const path = require('path')

const homepage = require('../../package.json').homepage

const getQRImage = require('../../dist/main').getQRImage
const getQR = require('../../dist/base').getQR
const getEPS = require('../../dist/eps').getEPS
const getPDF = require('../../dist/pdf').getPDF
const getPNG = require('../../dist/png').getPNG
const getSVG = require('../../dist/svg').getSVG

const outputPath = path.resolve(__dirname, 'output')

if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath)

// select output format and customize EC level, margin and size
fs.writeFileSync(
  path.resolve(outputPath, 'homepage.custom.png'),
  getQRImage(homepage, { type: 'png', ecLevel: 'H', margin: 1, size: 9 }),
)

// other supported formats
fs.writeFileSync(path.resolve(outputPath, 'homepage.eps'), getEPS(homepage))
fs.writeFileSync(path.resolve(outputPath, 'homepage.pdf'), getPDF(homepage))
fs.writeFileSync(path.resolve(outputPath, 'homepage.png'), getPNG(homepage))
fs.writeFileSync(path.resolve(outputPath, 'homepage.svg'), getSVG(homepage))

// we even offer the possibility to output a raw JSON object (2D array of 0|1) for custom processing
fs.writeFileSync(path.resolve(outputPath, 'homepage.json'), JSON.stringify(getQR(homepage)))
