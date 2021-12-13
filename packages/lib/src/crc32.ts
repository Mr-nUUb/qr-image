const lookup = new Uint32Array(256)
const helper = new Uint8Array(8)
const initial = 0xffffffff
const poly = 0xedb88320

lookup.forEach((_, i, self) => {
  self[i] = helper.reduce((crc) => (crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1), i) >>> 0
})

export function crc32(data: Buffer | Uint8Array | number[]) {
  const input = Uint8Array.from(data)
  return ~input.reduce((crc, byte) => lookup[(crc ^ byte) & 0xff] ^ (crc >>> 8), initial) >>> 0
}
