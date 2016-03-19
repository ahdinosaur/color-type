var test = require('tape')
var forEach = require('lodash/forEach')
var colorTypes = require('./')

test('describes color types', function (t) {
  t.equal(colorTypes.meta.kind, 'union')
  t.equal(typeof colorTypes.meta.name, 'string')

  forEach(colorTypes.meta.map, (color) => {
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
