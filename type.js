const t = require('tcomb')
const refineNumberInRange = require('t-range')
const colors = require('color-space')
const mapValues = require('lodash/mapValues')
const values = require('lodash/values')
const fromPairs = require('lodash/fromPairs')
const Pixels = require('ndpixels')

const STEP = 0.01

const BaseColor = t.struct({
  type: t.maybe(t.enums(
    mapValues(colors, getColorAlias)
  ))
}, 'BaseColor')

const subTypes = mapValues(
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

    ThisColor.fromArray = function fromArray (array) {
      const value = { type: colorId }
      color.channel.forEach((channel, index) => {
        value[channel] = array[index]
      }, this)
      return Color(value)
    }

    ThisColor.prototype.toArray = function toArray () {
      const array = new Array(color.channel.length)
      color.channel.forEach((channel, index) => {
        array[index] = this[channel]
      }, this)
      return array
    }

    ThisColor.prototype.toPixel = function toArray () {
      return Pixels({
        data: this.toArray(),
        shape: [1, 1, color.channel.length],
        format: color.name
      })
    }

    ThisColor.prototype.convert = function convert (toColorId) {
      if (this.format === toColorId) { return this }
      const toColorArray = color[toColorId](this.toArray())
      const ToColor = subTypes[toColorId]
      return ToColor.fromArray(toColorArray)
    }

    return ThisColor
  }
)

const Color = t.union(
  values(subTypes),
  'Color'
)

Color.meta.typesById = subTypes

Color.dispatch = function dispatchColorType (value) {
  if (value == null || value.type == null) {
    return BaseColor
  }
  return subTypes[value.type]
}

module.exports = Color

function getColorAlias (color) {
  return color.alias != null ? color.alias[0] : color.name
}
