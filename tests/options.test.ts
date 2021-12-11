import { getOptions } from '../src/options'

it('defaults to PNG', () => {
  // deepcode ignore MissingArgument/test: this is a test
  expect(getOptions().type).toMatch('png')
})
