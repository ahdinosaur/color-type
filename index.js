const t = require('tcomb')
const refineNumberInRange = require('t-range')
const colors = require('color-space')
const mapValues = require('lodash/mapValues')
const values = require('lodash/values')
const fromPairs = require('lodash/fromPairs')
const structView = require('tcomb-view/views/struct')
const canvas = require('virtual-canvas')
const Pixels = require('ndpixels')

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
      const ToColor = colorTypesById[toColorId]
      return ToColor.fromArray(toColorArray)
    }

    ThisColor.view = function viewColor (h, props) {
      console.log('pixel', props.value.toPixel())
      const hsl = props.value.convert('hsl')
      const rgb = props.value.convert('rgb')

      return h('div', { className: 'container' }, [
        // small panel of color
        h('div', { className: 'color' }, [
          canvas({ pixels: rgb.toPixel() })
        ]),
        // color controls
        h('div', { className: 'controls' }, [
          structView(h, props)
        ]),
        // hsl color picker gradient
        h('div', { className: 'picker' }, [
          h('div', { className: 'saturation-lightness' }, [
            canvas({
              pixels: getSaturationLightnessGradient(hsl),
              onclick: function (evt) {
                console.log('evt', evt)
              }
            })
          ]),
          h('div', { className: 'hue' }, [
            canvas({ pixels: getHueGradient(hsl) })
          ])
        ])
      ])
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

function getSaturationLightnessGradient (hsl) {
  const satSteps = 100
  const litSteps = 100
  const gradient = Pixels({
    data: new Float32Array(satSteps * litSteps * 3),
    shape: [satSteps, litSteps, 3],
    format: 'hsl'
  })

  for (var i = 0, sat = 0; sat < satSteps; ++sat) {
    for (var lit = 0; lit < litSteps; i += 3, ++lit) {
      gradient.data[i] = hsl.hue
      gradient.data[i + 1] = sat
      gradient.data[i + 2] = lit
    }
  }
  
  return gradient
}

function getHueGradient (hsl) {
  const hueSteps = 360
  const gradient = Pixels({
    data: new Float32Array(1 * hueSteps * 3),
    shape: [1, hueSteps, 3],
    format: 'hsl'
  })

  for (var i = 0, hue = 0; hue < hueSteps; i += 3, ++hue) {
    gradient.data[i] = hue
    gradient.data[i + 1] = hsl.saturation
    gradient.data[i + 2] = hsl.lightness
  }

  return gradient
}
