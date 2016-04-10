const Pixels = require('ndpixels')
const structView = require('tcomb-view/views/struct')
const canvas = require('virtual-canvas')
const Color = require('./type')

module.exports = viewColor

const HslColor = Color.meta.typesById.hsl

function viewColor (h, props) {
  console.log('pixel', props.value.toPixel())
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
        getSaturationLightnessPicker(props)
      ]),
      h('div', { className: 'hue' }, [
        getHuePicker(props)
      ])
    ])
  ])
}

function getSaturationLightnessPicker (props) {
  const hsl = props.value.convert('hsl')

  return canvas({
    pixels: getSaturationLightnessGradient(hsl),
    onclick: function (evt) {
      const format = props.value.type
      const nextSat = 100 * (evt.layerX / evt.target.width)
      const nextLit = 100 * (evt.layerY / evt.target.height)
      const prevHsl = props.value.convert('hsl')
      const nextHsl = HslColor.update(prevHsl, {
        saturation: { $set: nextSat },
        lightness: { $set: nextLit }
      })
      props.onUpdate(nextHsl.convert(format))
    }
  })
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

function getHuePicker (props) {
  return canvas({
    pixels: getHueGradient(360),
    onclick: function (evt) {
      const format = props.value.type
      const nextHue = 360 * (evt.layerY / evt.target.height)
      const prevHsl = props.value.convert('hsl')
      const nextHsl = HslColor.update(prevHsl, {
        hue: { $set: nextHue }
      })
      props.onUpdate(nextHsl.convert(format))
    }
  })
}

function getHueGradient (hueSteps) {
  const gradient = Pixels({
    data: new Float32Array(1 * hueSteps * 3),
    shape: [1, hueSteps, 3],
    format: 'hsl'
  })

  for (var i = 0, hue = 0; hue < hueSteps; i += 3, ++hue) {
    gradient.data[i] = hue
    gradient.data[i + 1] = 100
    gradient.data[i + 2] = 50
  }

  return gradient
}
