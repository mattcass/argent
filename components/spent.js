import React from 'react'
import { dateString }  from '../static/helpers'

export default class Spent extends React.Component {
  static propTypes = {
    addPayment: React.PropTypes.func.isRequired
  }

  handleForm = (e) => {
    e.preventDefault()
    const payment = {
      date: new Date().toString().slice(0, -15),
      payment: +this.input.value
    }
    this.props.addPayment(payment)
    this.form.reset()
  }
  render() {
    return (
      <form action="" ref={(input) => this.form = input} onSubmit={(e) => this.handleForm(e) }>
        <label className="sr-only">
          How much did you just spend?
          <input
            type="number"
            step="00.01"
            ref={(input) => {this.input = input }}
            required
          />
        </label>
        <button type="submit">$</button>
      </form>
    )
  }
}
