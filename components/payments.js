import React from 'react'

export default class Payments extends React.Component {
  static propTypes = {
    spent: React.PropTypes.object.isRequired,
    removePayment: React.PropTypes.func.isRequired
  }

  renderPaymentList = (key) => {
    const spent = this.props.spent[key]
    const button = <button type="button" className="btn" onClick={() => this.props.removePayment(key)}>&times;</button>
    return (
      <tr key={key}>
        <td><b>${(spent.payment).toFixed(2)}</b></td>
        <td>{spent.date}</td>
        <td>{button}</td>
      </tr>
    )
  }

  render() {
    return(
      <section className="payments">
        <table>
          <thead>
            <tr>
              <th>Money Spent</th>
              <th>Date</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.spent).map(this.renderPaymentList)}
          </tbody>
        </table>
        <style>{`
          .payments {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            padding: 2em 4em 2em 2em;
            overflow: auto;
            max-height: 600px;
          }
          table th {
            text-align: left;
            padding: 0.25em;
            min-width: 150px;
          }
          th:last-child,
          td:last-child {
            text-align: right;
          }
       `}</style>
      </section>
    )
  }
}
