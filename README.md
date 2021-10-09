# Cachy
How it works?

    const cachy = require('./cachy')

    cachy.init({
      path: '.cachy'
    })

    cachy
      .add('foo', { foo: 1 })
      .add('bar', { bar: 2 })
      .save()

    cachy.unset('foo').save()
    cachy.unset('bar').save()
    cachy.unlink()