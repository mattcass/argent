import React from 'react'

export default class Payments extends React.Component {
  static propTypes = {
    spent: React.PropTypes.object.isRequired,
    removePayment: React.PropTypes.func.isRequired
  }

  renderPaymentList = (key) => {
    const spent = this.props.spent[key]
    const button = <button type="button" onClick={() => this.props.removePayment(key)}>&times;</button>
    return (
      <li key={key}>
        <span className="payment-amount">You spent <b>${(spent.payment).toFixed(2)}</b></span>
        {spent.date}
        {button}
      </li>
    )
  }

  render() {
    return(
      <section>
        <ul className="payment-list">
          {Object.keys(this.props.spent).map(this.renderPaymentList)}
        </ul>
      </section>
    )
  }
}
