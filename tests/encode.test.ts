import { encode } from '../src/encode'

const tests = [
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
tests.forEach((testData) => {
  it(`encodes ${testData.name} data`, () => {
    expect(encode(testData.data, testData.url)).toMatchSnapshot()
  })
})
