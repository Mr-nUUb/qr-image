import { getQR } from './base'
import { getOptions } from './options'
import { getPath } from './path'
import { ImageOptions } from './types'

export function getEPS(text: string, options: ImageOptions) {
  const scale = 9
  const opt = getOptions(options)
  const matrix = getQR(text, opt)
  const X = (matrix.length + 2 * opt.margin) * scale

  const eps = [
    '%!PS-Adobe-3.0 EPSF-3.0',
    `%%BoundingBox: 0 0 ${X} ${X}`,
    '/h { 0 rlineto } bind def',
    '/v { 0 exch neg rlineto } bind def',
    `/M { neg ${matrix.length + opt.margin} add moveto } bind def`,
    '/z { closepath } bind def',
    `${scale} ${scale} scale`,
  ]

  getPath(matrix).forEach((subpath) => {
    let line = ''
    for (let k = 0; k < subpath.length; k++) {
      const item = subpath[k]
      switch (item[0]) {
        case 'M':
          line += `${item[1] + opt.margin} ${item[2]} M `
          break
        default:
          line += `${item[1]} ${item[0]} `
          break
      }
    }
    eps.push(`${line}z`)
  })

  eps.push('fill\n%%EOF')
  return eps.join('\n')
}
