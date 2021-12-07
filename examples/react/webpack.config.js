/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolveExample(p) {
  return path.resolve(path.dirname(__filename), p)
}

module.exports = {
  entry: resolveExample('src/example.js'),
  output: {
    filename: 'entry.js',
    path: resolveExample('build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: 'last 2 versions',
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-optional-chaining'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveExample('public/index.html'),
    }),
  ],
  target: 'web',
  mode: 'development',
  devServer: {
    open: true,
    static: {
      directory: resolveExample('public'),
    },
  },
}
