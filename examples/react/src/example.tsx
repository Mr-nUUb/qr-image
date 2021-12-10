import React from 'react'
import ReactDOM from 'react-dom'
import { QRImage } from 'qr-image/react'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const homepage = require('../../../package.json').homepage

ReactDOM.render(
  <>
    <a href={homepage} target={'_blank'} rel='noreferrer'>
      <QRImage value={homepage} ecLevel='M' size={256} margin={2} fgColor='maroon' bgColor='#EEEEEE' className='' />
    </a>
    <p>I ❤️ TS</p>
  </>,
  document.getElementById('example'),
)
