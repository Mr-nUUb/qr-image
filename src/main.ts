import { getOptions } from './options'
import { getPNG } from './png'
import { ImageOptions } from './types'

export function getQRImage(
  text: string,
  options: Omit<ImageOptions, 'type'> & Required<Pick<ImageOptions, 'type'>>,
) {
  switch (options.type) {
    case 'png':
      return getPNG(text, getOptions(options))
    case 'svg':
      throw new Error('Type png not yet implemented')
    default:
      throw new Error('Unknown type')
  }
}
