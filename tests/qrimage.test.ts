import { encode } from '../src/encode'
import { getQRImage } from '../src/main'
import { getOptions } from '../src/options'
import { ImageOptions, ImageType } from '../src/types'

type TestData = { name: string; type: ImageType; options?: ImageOptions }

const text = 'I ❤️ @mr-nuub/qr-image'

const imageTests: TestData[] = [
  {
    name: 'EPS',
    type: 'eps',
  },
  {
    name: 'JSON ',
    type: 'json',
  },
  {
    name: 'PDF',
    type: 'pdf',
  },
  {
    name: 'PNG',
    type: 'png',
  },
  {
    name: 'SVG',
    type: 'svg',
    options: { size: 3 },
  },
  {
    name: 'PNG with options',
    type: 'png',
    options: { ecLevel: 'H', margin: 1, size: 9 },
  },
]
imageTests.forEach((testData) => {
  it(`renders a ${testData.name}`, () => {
    expect(getQRImage(text, { type: testData.type, ...testData.options })).toMatchSnapshot()
  })
})

const encodeTests = [
  {
    name: 'alphanumeric',
    data: 'ASDF1234',
    url: false,
  },
  {
    name: 'numeric',
    data: '1234567890',
    url: false,
  },
  {
    name: 'URL',
    data: 'https://github.com/',
    url: true,
  },
  {
    name: 'URL+path',
    data: 'https://github.com/Mr-nUUb/qr-image',
    url: true,
  },
  {
    name: 'binary',
    data: [
      0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f,
      0x4d, 0x72, 0x2d, 0x6e, 0x55, 0x55, 0x62, 0x2f, 0x71, 0x72, 0x2d, 0x69, 0x6d, 0x61, 0x67, 0x65,
    ],
    url: false,
  },
]
encodeTests.forEach((testData) => {
  it(`encodes ${testData.name} data`, () => {
    expect(encode(testData.data, testData.url)).toMatchSnapshot()
  })
})

it('defaults to PNG', () => {
  // deepcode ignore MissingArgument/test: this is a test
  expect(getOptions().type).toMatch('png')
})

it('throws', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(() => getQRImage(text, { type: 'asdf' })).toThrow('Unknown type')
})
