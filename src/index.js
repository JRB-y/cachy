const cachy = require('./cachy')

cachy.init({
  path: '.cachy'
})

cachy
  .add('foo', { foo: 1 })
  .add('bar', { bar: 2 })
  .save()

// cachy.unset().save()

// cachy.add('foo', { foo: 'foo' })
// cachy.add('bar', { bar: 'bar' })
// cachy.add('taz', { taz: 'taz' })

// console.log(cachy.get('bar'))

// cachy.unset()
// cachy.save()

