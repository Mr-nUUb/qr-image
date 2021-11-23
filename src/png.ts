import { deflateSync } from 'zlib'
import { crc32 } from './crc32'
import { qr } from './base'
import { ImageOptions } from './types'

const PNG_HEAD = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const PNG_IHDR = Buffer.from([
  0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
])
const PNG_IDAT = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x44, 0x41, 0x54])
const PNG_IEND = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
])

export function getPNG(text: string, options: ImageOptions) {
  const matrix = qr(text, options.ecLevel, options.parseUrl)
  const N = matrix.length
  const X = (N + 2 * options.margin) * options.size
  const data = Buffer.alloc((X + 1) * X).fill(255)

  for (let i = 0; i < X; i++) data[i * (X + 1)] = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j]) {
        const start = ((options.margin + i) * (X + 1) + (options.margin + j)) * options.size + 1
        const end = start + options.size
        data.fill(0, start, end)
        for (let c = 0; c < options.size; c++) {
          const dest = start + c * (X + 1)
          data.copyWithin(dest, start, end)
        }
      }
    }
  }

  const ihdr = Buffer.concat([PNG_IHDR])
  ihdr.writeUInt32BE(X, 8)
  ihdr.writeUInt32BE(X, 12)
  ihdr.writeUInt32BE(crc32(ihdr.slice(4, -4)), 21)

  const idat = Buffer.concat([PNG_IDAT, deflateSync(data, { level: 9 }), Buffer.alloc(4)])
  idat.writeUInt32BE(idat.length - 12, 0)
  idat.writeUInt32BE(crc32(idat.slice(4, -4)), idat.length - 4)

  return Buffer.concat([PNG_HEAD, ihdr, idat, PNG_IEND])
}
