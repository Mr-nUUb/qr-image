/**
 * @jest-environment jsdom
 */

import 'jest-canvas-mock'
import 'path2d-polyfill'

import { getByTestId, render } from '@testing-library/vue'
import QRImage from '../src/vue'

const text = 'I ❤️ @mr-nuub/qr-image'

it('renders correctly', () => {
  const { container } = render(QRImage, { props: { value: text } })
  const canvas = getByTestId(container as HTMLElement, 'QRImage') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const events = ctx.__getEvents()
  expect(events).toMatchSnapshot()
})
