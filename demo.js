var React = require('react')
var ReactDOM = require('react-dom')
var h = require('r-dom')
var t = require('tcomb-form')

var ColorType = require('./')

var App = React.createClass({

  onSubmit(evt) {
    evt.preventDefault()
    var v = this.refs.form.getValue()
    if (v) {
      console.log(v)
    }
  },

  render() {
    return h('form', { onSubmit: this.onSubmit }, [
      h(t.form.Form, {
        ref: 'form',
        type: ColorType
      }),
      h('div', { className: 'form-group' }, [
        h('button', { type: 'submit', className: 'btn btn-primary' }, 'Save')
      ])
    ])
  }
})

const main = document.createElement('main')
document.body.appendChild(main)

ReactDOM.render(
  h(App, {}),
  main
)
