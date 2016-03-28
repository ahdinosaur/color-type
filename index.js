const t = require('tcomb')
const refineNumberInRange = require('t-range')
const colors = require('color-space')
const mapValues = require('lodash/mapValues')
const values = require('lodash/values')
const fromPairs = require('lodash/fromPairs')

const STEP = 0.01

const BaseColor = t.struct({
  type: t.maybe(t.enums(
    mapValues(colors, getColorAlias)
  ))
}, 'BaseColor')

const colorTypesById = mapValues(
  colors,
  (color, colorId) => {
    const colorAlias = getColorAlias(color, colorId)
    const colorProperties = fromPairs(color.channel.map((channel, index) => {
      return [
        channel,
        refineNumberInRange({
          min: color.min[index],
          max: color.max[index],
          step: STEP
        })
      ]
    }))

    const ThisColor = BaseColor.extend(colorProperties, colorAlias)

    ThisColor.prototype.toArray = function toArray () {
      const array = new Array(color.channel.length)
      color.channel.forEach((channel, index) => {
        array[index] = this[channel]
      }, this)
      return array
    }

    ThisColor.fromArray = function fromArray (array) {
      const value = { type: colorId }
      color.channel.forEach((channel, index) => {
        value[channel] = array[index]
      }, this)
      return Color(value)
    }

    ThisColor.prototype.convert = function convert (toColorId) {
      const toColorArray = color[toColorId](this.toArray())
      const ToColor = colorTypesById[toColorId]
      return ToColor.fromArray(toColorArray)
    }

    return ThisColor
  }
)

const Color = t.union(
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
