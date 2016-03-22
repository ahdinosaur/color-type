var t = require('tcomb')
var colors = require('color-space')
var mapValues = require('lodash/mapValues')
var values = require('lodash/values')
var fromPairs = require('lodash/fromPairs')

var BaseColorType = t.struct({
  type: t.maybe(t.enums(
    mapValues(colors, getColorAlias)
  ))
}, 'BaseColorType')

var colorTypesById = mapValues(
  colors,
  (color, colorId) => {
    var colorAlias = getColorAlias(color, colorId)
    var colorProperties = fromPairs(color.channel.map((channel, index) => {
      return [channel, Between(color.min[index], color.max[index])]
    }))

    var ThisColorType = BaseColorType.extend(colorProperties, colorAlias)

    ThisColorType.prototype.toArray = function toArray () {
      var array = new Array(color.channel.length)
      color.channel.forEach((channel, index) => {
        array[index] = this[channel]
      }, this)
      return array
    }

    ThisColorType.fromArray = function fromArray (array) {
      var value = { type: colorId }
      color.channel.forEach((channel, index) => {
        value[channel] = array[index]
      }, this)
      return ColorType(value)
    }

    ThisColorType.prototype.convert = function convert (toColorId) {
      const toColorArray = color[toColorId](this.toArray())
      const ToColorType = colorTypesById[toColorId]
      return ToColorType.fromArray(toColorArray)
    }

    return ThisColorType
  }
)

var ColorType = t.union(
  values(colorTypesById),
  'ColorType'
)

ColorType.dispatch = function dispatchColorType (colorType) {
  if (colorType == null || colorType.type == null) {
    return BaseColorType
  }
  return colorTypesById[colorType.type]
}

module.exports = ColorType

function Between (min, max) {
  return t.refinement(
    t.Number,
    (n) => n >= min && n <= max,
    'Between ' + min + ' and ' + max + ' (inclusive)'
  )
}

function getColorAlias (color) {
  return color.alias != null ? color.alias[0] : color.name
}
