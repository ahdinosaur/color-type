
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
    return BaseColorType.extend(colorProperties, colorAlias)
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
    'Between (inclusive)'
  )
}

function getColorAlias (color, colorId) {
  return color.alias != null ? color.alias[0] : colorId
}
