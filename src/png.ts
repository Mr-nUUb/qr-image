import { deflateSync } from 'zlib'
import { crc32 } from './crc32'
import { getQR } from './base'
import { ImageOptions } from './types'
import { getOptions } from './options'

const PNG_HEAD = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const PNG_IHDR = Buffer.from([0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0])
const PNG_IDAT = Buffer.from([0, 0, 0, 0, 73, 68, 65, 84])
const PNG_IEND = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130])

export function getPNG(text: string, options: Omit<ImageOptions, 'type'> & Required<Pick<ImageOptions, 'type'>>) {
  const opt = getOptions(options)
  const matrix = getQR(text, opt)
  const N = matrix.length
  const X = (N + 2 * opt.margin) * opt.size
  const data = Buffer.alloc((X + 1) * X).fill(255)

  for (let i = 0; i < X; i++) data[i * (X + 1)] = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j]) {
        const start = ((opt.margin + i) * (X + 1) + (opt.margin + j)) * opt.size + 1
        const end = start + opt.size
        data.fill(0, start, end)
        for (let c = 0; c < opt.size; c++) {
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
