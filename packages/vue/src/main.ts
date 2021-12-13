import { defineComponent, h, onMounted, onUpdated, PropType, ref } from 'vue'
import { ECLevel, getQR, getSVGPath } from '@qr-image/lib'

const Props = {
  value: {
    type: String,
    required: true,
    default: '',
  },
  ecLevel: {
    // needs validator?
    type: String as PropType<ECLevel>,
    default: 'M',
  },
  size: {
    type: Number,
    default: 256,
  },
  margin: {
    type: Number,
    default: 0,
  },
  fgColor: {
    type: String,
    default: '#000000',
  },
  bgColor: {
    type: String,
    default: '#FFFFFF',
  },
}

const QRImage = defineComponent({
  name: 'QRImage',
  setup(props) {
    const { value, ecLevel, size, margin, fgColor, bgColor } = props
    const canvasRef = ref<HTMLCanvasElement | null>(null)

    const encode = () => {
      if (!canvasRef.value) return

      const canvas = canvasRef.value
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
    }

    onMounted(encode)
    onUpdated(encode)

    return () => h('canvas', { ref: canvasRef, style: { height: size, width: size }, 'data-testid': 'QRImage' })
  },
  props: Props,
})

export default QRImage
