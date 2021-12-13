/**
 * @jest-environment jsdom
 */

import 'jest-canvas-mock'
import 'path2d-polyfill'

import React from 'react'
import { getByTestId, render } from '@testing-library/react'
import { QRImage } from '../src/main'

const text = 'I ❤️ @mr-nuub/qr-image'

it('renders correctly', () => {
  const { container } = render(<QRImage value={text} />)
  const canvas = getByTestId(container, 'QRImage') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const events = ctx.__getEvents()
  expect(events).toMatchSnapshot()
})

it('renders with custom settings', () => {
  const { container } = render(
    <QRImage value={text} ecLevel='L' size={128} margin={1} fgColor='maroon' bgColor='#EEEEEE' className='my-class' />,
  )
  const canvas = getByTestId(container, 'QRImage') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const events = ctx.__getEvents()
  expect(events).toMatchSnapshot()
})
