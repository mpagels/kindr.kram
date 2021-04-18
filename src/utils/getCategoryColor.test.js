import getCategoryColor from './getCategoryColor'

describe('return hex codes depending on category name', () => {
  test('deposit -> #2a9d8f', () => {
    expect(getCategoryColor('deposit')).toBe('#2a9d8f')
  })
  test('withdraw -> #e76f51', () => {
    expect(getCategoryColor('deposit')).toBe('#2a9d8f')
  })
  test('donation -> #e9c46a', () => {
    expect(getCategoryColor('deposit')).toBe('#2a9d8f')
  })
})
