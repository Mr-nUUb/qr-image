import { deflate } from 'pako'
import { crc32 } from './crc32'
import { getQR } from './base'
import { ImageOptions } from './types'
import { getOptions } from './options'

const PNG_HEAD = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])
const PNG_IHDR = new Uint8Array([0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0])
const PNG_IDAT = new Uint8Array([0, 0, 0, 0, 73, 68, 65, 84])
const PNG_IEND = new Uint8Array([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130])

function toUint8Array(num: number) {
  return new Uint8Array([(num & 0xff000000) >> 24, (num & 0x00ff0000) >> 16, (num & 0x0000ff00) >> 8, num & 0x000000ff])
}

export function getPNG(text: string, options?: ImageOptions) {
  const opt = getOptions(options)
  const matrix = getQR(text, opt)
  const N = matrix.length
  const X = (N + 2 * opt.margin) * opt.size
  const data = new Uint8Array((X + 1) * X).fill(255)

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

  const ihdr = new Uint8Array(PNG_IHDR)
  const Xuint = toUint8Array(X)
  ihdr.set(Xuint, 8)
  ihdr.set(Xuint, 12)
  ihdr.set(toUint8Array(crc32(ihdr.slice(4, -4))), 21)

  const idat = new Uint8Array([...PNG_IDAT, ...deflate(data, { level: 9 }), ...new Uint8Array(4)])
  idat.set(toUint8Array(idat.length - 12), 0)
  idat.set(toUint8Array(crc32(idat.slice(4, -4))), idat.length - 4)

  return new Uint8Array([...PNG_HEAD, ...ihdr, ...idat, ...PNG_IEND])
}
