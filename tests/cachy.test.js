const { existsSync } = require('fs')

const cachy = require('../src/cachy')
const PATH = '.cachy'

test('should init and create the cache file', () => {
  cachy.init({ path: PATH })
  expect(existsSync(PATH)).toBe(true)
})

test('should load Buffer as JSON Object', () => {
  expect(cachy.loadDataAsJson()).toBeInstanceOf(Object)
})

test('should add Foo and Bar objects and save', () => {
  cachy.add('Foo', { foo: 'foo' }).save()
  cachy.add('Bar', { bar: 'bar' }).save()
  expect(cachy.data).toHaveProperty('Foo')
  expect(cachy.data).toHaveProperty('Bar')
})

test('should unset Foo', () => {
  cachy.unset('Foo').save()

  expect(cachy.data).toStrictEqual({ Bar: { bar: 'bar' }})
})

test('should unset all data', () => {
  cachy.unset().save()
  expect(cachy.data).toStrictEqual({})
})

test('should unlink cache file', () => {
  cachy.unlink()
  expect(existsSync(PATH)).toBe(false)
})
