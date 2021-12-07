/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const QRImage = require('../../../dist/react')

const homepage = require('../../../package.json').homepage

ReactDOM.render(
  <a href={homepage} target={'_blank'} rel='noreferrer'>
    <QRImage value={homepage} ecLevel='M' size={256} margin={2} fgColor='maroon' bgColor='#EEEEEE' className='' />
  </a>,
  document.getElementById('example'),
)
