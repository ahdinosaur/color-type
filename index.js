var t = require('tcomb')
var refineNumberInRange = require('t-range')
var colors = require('color-space')
var mapValues = require('lodash/mapValues')
var values = require('lodash/values')
var fromPairs = require('lodash/fromPairs')

var STEP = 0.01

var BaseColor = t.struct({
  type: t.maybe(t.enums(
    mapValues(colors, getColorAlias)
  ))
}, 'BaseColor')

var colorTypesById = mapValues(
  colors,
  (color, colorId) => {
    var colorAlias = getColorAlias(color, colorId)
    var colorProperties = fromPairs(color.channel.map((channel, index) => {
      return [
        channel,
        refineNumberInRange({
          min: color.min[index],
          max: color.max[index],
          step: STEP
        })
      ]
    }))

    var ThisColor = BaseColor.extend(colorProperties, colorAlias)

    ThisColor.prototype.toArray = function toArray () {
      var array = new Array(color.channel.length)
      color.channel.forEach((channel, index) => {
        array[index] = this[channel]
      }, this)
      return array
    }

    ThisColor.fromArray = function fromArray (array) {
      var value = { type: colorId }
      color.channel.forEach((channel, index) => {
        value[channel] = array[index]
      }, this)
      return Color(value)
    }

    ThisColor.prototype.convert = function convert (toColorId) {
      var toColorArray = color[toColorId](this.toArray())
      var ToColor = colorTypesById[toColorId]
      return ToColor.fromArray(toColorArray)
    }

    return ThisColor
  }
)

var Color = t.union(
  values(colorTypesById),
  'Color'
)

Color.dispatch = function dispatchColorType (value) {
  if (value == null || value.type == null) {
    return BaseColor
  }
  return colorTypesById[value.type]
}

module.exports = Color
module.exports.colorTypesById = colorTypesById

function getColorAlias (color) {
  return color.alias != null ? color.alias[0] : color.name
}
