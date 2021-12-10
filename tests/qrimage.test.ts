import { getQRImage } from '../src/main'
import { ImageOptions, ImageType } from '../src/types'

type TestData = { name: string; type: ImageType; options?: ImageOptions }

const text = 'I ❤️ @mr-nuub/qr-image'

const tests: TestData[] = [
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
  },
  {
    name: 'PNG with options',
    type: 'png',
    options: { ecLevel: 'H', margin: 1, size: 9 },
  },
]

tests.forEach((testData) => {
  it(`renders a ${testData.name}`, () => {
    expect(getQRImage(text, { type: testData.type, ...testData.options })).toMatchSnapshot()
  })
})
