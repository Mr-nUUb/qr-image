import React from 'react'
import { getQR } from './base'
import { getSVGPath } from './svg'
import { ECLevel } from './types'

type Props = {
  value: string
  ecLevel?: ECLevel
  size?: number
  margin?: number
  fgColor?: string
  bgColor?: string
  className?: string
}

export const QRImage = ({
  value,
  ecLevel = 'M',
  size = 256,
  margin = 0,
  fgColor = '#000000',
  bgColor = '#FFFFFF',
  className = '',
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const qrMatrix = getQR(value, { ecLevel })
    const numModules = qrMatrix.length + margin * 2
    const pixelRatio = window.devicePixelRatio
    const scale = (size / numModules) * pixelRatio

    canvas.height = canvas.width = size * pixelRatio
    ctx.scale(scale, scale)

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, numModules, numModules)

    ctx.fillStyle = fgColor
    ctx.fill(new Path2D(getSVGPath(qrMatrix, margin)))
  }, [bgColor, fgColor, ecLevel, margin, size, value])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      height={size}
      style={{ height: size, width: size }}
      width={size}
      data-testid='QRImage'
    />
  )
}
