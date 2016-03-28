const vdom = require('virtual-dom')
const h = require('virtual-dom/h')
const loop = require('virtual-raf')
const view = require('tcomb-view')
const Color = require('../')

var tree
const props = {
  type: Color,
  value: Color({
    type: 'rgb',
    red: 0,
    green: 0,
    blue: 0
  }),
  onUpdate: function (value) {
    console.log('value', value)
    const prevValue = props.value
    if (value.type !== prevValue.type) {
      value = prevValue.convert(value.type)
    }
    tree.update(
      Object.assign(props, { value })
    )
    styleColor(value)
  },
}
tree = loop(props, view(h), vdom)

document.querySelector('main').appendChild(tree.render())

function styleColor (color) {
  const rgb = color.convert('rgb')
  const colorString = [
    'rgb(',
    Math.round(rgb.red) + ',',
    Math.round(rgb.green) + ',',
    Math.round(rgb.blue),
    ')'
  ].join('')
  document.body.style.backgroundColor = colorString
}
