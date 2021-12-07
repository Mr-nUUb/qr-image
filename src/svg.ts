import { getQR } from './base'
import { getOptions } from './options'
import { getPath } from './path'
import { ImageOptions, Matrix } from './types'

export function getSVG(text: string, options: ImageOptions) {
  const opt = getOptions(options)
  const matrix = getQR(text, opt)
  const X = matrix.length + 2 * opt.margin

  let svg = '<?xml version="1.0" encoding="UTF-8"?>'

  svg += '<svg xmlns="http://www.w3.org/2000/svg" '
  if (opt.size > 0) {
    const XY = X * opt.size
    svg += `width="${XY}" height="${XY}" `
  }
  svg += `viewBox="0 0 ${X} ${X}">`

  svg += `<path d="${getSVGPath(matrix, opt.margin)}"/></svg>`

  return svg
}

export function getSVGPath(matrix: Matrix, margin: number) {
  let path = ''
  getPath(matrix).forEach((subpath) => {
    for (let k = 0; k < subpath.length; k++) {
      const item = subpath[k]
      switch (item[0]) {
        case 'M':
          // item[0] === 'M' implies item[2] is number
          // this line is here to stop TS from complaining
          if (item[2] === undefined) break
          path += `M${item[1] + margin} ${item[2] + margin}`
          break
        default:
          path += item.join('')
          break
      }
    }
    path += 'z'
  })
  return path
}
