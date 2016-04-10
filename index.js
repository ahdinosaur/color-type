const Color = require('./type')
const viewColor = require('./view')

Color.meta.types.forEach(function (subType) {
  subType.view = viewColor
})

module.exports = Color
