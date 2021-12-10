import { getQR } from './base'
import { getOptions } from './options'
import { getPath } from './path'
import { ImageOptions } from './types'

export function getPDF(text: string, options?: ImageOptions) {
  const scale = 9
  const opt = getOptions(options)
  const matrix = getQR(text, opt)
  const X = (matrix.length + 2 * opt.margin) * scale

  const pdf = [
    '%PDF-1.0\n\n',
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n',
    '2 0 obj << /Type /Pages /Count 1 /Kids [ 3 0 R ] >> endobj\n',
    `3 0 obj << /Type /Page /Parent 2 0 R /Resources <<>> /Contents 4 0 R /MediaBox [ 0 0 ${X} ${X} ] >> endobj\n`,
  ]

  let path = `${scale} 0 0 ${scale} 0 0 cm\n`
  path += getPath(matrix)
    .map((subpath) => {
      let res = ''
      let x = 0
      let y = 0
      for (let k = 0; k < subpath.length; k++) {
        const item = subpath[k]
        switch (item[0]) {
          case 'M':
            x = item[1] + opt.margin
            y = matrix.length - (item[2] || 0) + opt.margin
            res += `${x} ${y} m `
            break
          case 'h':
            x += item[1]
            res += `${x} ${y} l `
            break
          case 'v':
            y -= item[1]
            res += `${x} ${y} l `
            break
        }
      }
      res += 'h'
      return res
    })
    .join('\n')
  path += '\nf'
  pdf.push(`4 0 obj << /Length ${path.length} >> stream\n${path}\nendstream\nendobj\n`)

  let xref = 'xref\n0 5\n0000000000 65535 f \n'
  let l = pdf[0].length
  for (let i = 1; i < 5; i++) {
    xref += `${padLeadingZeros(l.toString(), 10)} 00000 n \n`
    l += pdf[i].length
  }
  pdf.push(`${xref}trailer << /Root 1 0 R /Size 5 >>\nstartxref\n${l.toString()}\n`)

  pdf.push('%%EOF')
  return pdf.join('')
}

function padLeadingZeros(s: string, n: number): string {
  let p = s
  while (p.length < n) p = `0${p}`
  return p
}
