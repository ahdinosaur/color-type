const test = require('tape')
const forEach = require('lodash/forEach')
const Color = require('../')

describe('t-color', function(t) {
  t.ok(Color, 'module is require-able')
  t.end()
})

test('describes color types', function (t) {
  t.equal(Color.meta.kind, 'union')
  t.equal(typeof Color.meta.name, 'string')

  forEach(Color.meta.map, (color) => {
    t.equal(color.meta.kind, 'struct')
    t.equal(typeof color.meta.name, 'string')
    
    forEach(color.meta.props, (property, propertyName) => {
      switch (propertyName) {
        case 'min':
        case 'max':
        case 'channel':
          t.ok(Array.isArray(property))
          break
      }
    })
  })

  t.end()
})
