import { ImageOptions, ImageType } from './types'

export function getOptions(inOptions: ImageOptions) {
  const type: ImageType = !inOptions || !inOptions.type ? 'png' : inOptions.type
  const defaults = type === 'png' ? bitmapOptions : vectorOptions
  return { ...defaults, ...inOptions }
}

const commonOptions: Pick<ImageOptions, 'type' | 'parseUrl' | 'ecLevel'> = {
  type: 'png',
  parseUrl: false,
  ecLevel: 'M',
}

const bitmapOptions: ImageOptions = {
  ...commonOptions,
  margin: 4,
  size: 5,
}

const vectorOptions: ImageOptions = {
  ...commonOptions,
  margin: 1,
  size: 0,
}
