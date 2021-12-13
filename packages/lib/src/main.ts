import { getQR } from './base'
import { getEPS } from './eps'
import { getPDF } from './pdf'
import { getPNG } from './png'
import { getSVG, getSVGPath } from './svg'
import { ECLevel, ImageOptions } from './types'

export { getQR, getEPS, getPDF, getPNG, getSVG, getSVGPath, ImageOptions, ECLevel }

export function getQRImage(text: string, options: Omit<ImageOptions, 'type'> & Required<Pick<ImageOptions, 'type'>>) {
  switch (options.type) {
    case 'json':
      return getQR(text, options)
    case 'png':
      return getPNG(text, options)
    case 'svg':
      return getSVG(text, options)
    case 'eps':
      return getEPS(text, options)
    case 'pdf':
      return getPDF(text, options)
    default:
      throw new Error('Unknown type')
  }
}
