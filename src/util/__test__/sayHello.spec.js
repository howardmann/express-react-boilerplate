let sayHello = require('../sayHello')

describe('sayHello', () => {
  it('should render string', () => {
    let input = sayHello('World')
    let actual = 'Hello World'
    expect(input).toBe(actual)
  })
})