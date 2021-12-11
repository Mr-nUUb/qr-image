import { getQRImage } from '../src/main'
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

it('throws', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(() => getQRImage(text, { type: 'asdf' })).toThrow('Unknown type')
})
