import { Matrix } from './types'

export function getPath(matrix: Matrix) {
  const N = matrix.length
  const filled: number[][] = []
  for (let row = -1; row <= N; row++) {
    filled[row] = []
  }

  const path = []
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (filled[row][col]) continue
      filled[row][col] = 1
      if (isDark(row, col)) {
        if (!isDark(row - 1, col)) {
          path.push(plot(row, col, 'right'))
        }
      } else {
        if (isDark(row, col - 1)) {
          path.push(plot(row, col, 'down'))
        }
      }
    }
  }
  return path

  function isDark(row: number, col: number) {
    if (row < 0 || col < 0 || row >= N || col >= N) return false
    return !!matrix[row][col]
  }

  function plot(row0: number, col0: number, dir0: 'up' | 'down' | 'left' | 'right') {
    filled[row0][col0] = 1
    const res: [['M' | 'v' | 'h', number, number?]] = [['M', col0, row0]]
    let row = row0
    let col = col0
    let dir = dir0
    let len = 0
    do {
      switch (dir) {
        case 'right':
          filled[row][col] = 1
          if (isDark(row, col)) {
            filled[row - 1][col] = 1
            if (isDark(row - 1, col)) {
              res.push(['h', len])
              len = 0
              dir = 'up'
            } else {
              len++
              col++
            }
          } else {
            res.push(['h', len])
            len = 0
            dir = 'down'
          }
          break
        case 'left':
          filled[row - 1][col - 1] = 1
          if (isDark(row - 1, col - 1)) {
            filled[row][col - 1] = 1
            if (isDark(row, col - 1)) {
              res.push(['h', -len])
              len = 0
              dir = 'down'
            } else {
              len++
              col--
            }
          } else {
            res.push(['h', -len])
            len = 0
            dir = 'up'
          }
          break
        case 'down':
          filled[row][col - 1] = 1
          if (isDark(row, col - 1)) {
            filled[row][col] = 1
            if (isDark(row, col)) {
              res.push(['v', len])
              len = 0
              dir = 'right'
            } else {
              len++
              row++
            }
          } else {
            res.push(['v', len])
            len = 0
            dir = 'left'
          }
          break
        case 'up':
          filled[row - 1][col] = 1
          if (isDark(row - 1, col)) {
            filled[row - 1][col - 1] = 1
            if (isDark(row - 1, col - 1)) {
              res.push(['v', -len])
              len = 0
              dir = 'left'
            } else {
              len++
              row--
            }
          } else {
            res.push(['v', -len])
            len = 0
            dir = 'right'
          }
          break
      }
    } while (row != row0 || col != col0)
    return res
  }
}
