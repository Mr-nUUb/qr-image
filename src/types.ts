/** Stores encoded data for different versions. */
export type EncodedData = {
  /** Encoded data for versions 1-9. */
  DataVersionLow: number[]
  /** Encoded data for versions 10-26. */
  DataVersionMid: number[]
  /** Encoded data for versions 27-40. */
  DataVersionHigh: number[]
}

/** Holds all information needed to create a QR code */
export type Data = {
  /** The version of the resulting QR code */
  version: number
  /** The length of the encoded data. */
  dataLength: number
  /** The encoded data. */
  blocks: number[][]
  /** The length of the blocks. This is an array because block length can change. */
  blockLength: number[]
  /** The error correction code. */
  ec: number[][]
  /** The length of the error correction code. This is a number, because EC length can't change. */
  ecLength: number
  /** The level of the error correction code. */
  ecLevel: ECLevel
}

export type ImageOptions = {
  parseUrl?: boolean
  ecLevel?: ECLevel
  size?: number
  margin?: number
  type?: ImageType
}

export type ImageType = 'json' | 'png' | 'svg' | 'eps' | 'pdf'

/** The level of the error correction code, determines hogh much data can be restored. */
export type ECLevel =
  /** Low, 7% of data can be restored. */
  | 'L'
  /** Medium, 15% of data can be restored. */
  | 'M'
  /** Quartile, 25% of data can be restored. */
  | 'Q'
  /** High, 30% of data can be restored. */
  | 'H'

export type Matrix = number[][]
