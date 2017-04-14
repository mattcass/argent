import React from 'react'
import TrashSvg from '../static/icons/trash.svg';

export default class Payments extends React.Component {
  static propTypes = {
    spent: React.PropTypes.object.isRequired,
    removePayment: React.PropTypes.func.isRequired
  }

  renderPaymentList = (key) => {
    const spent = this.props.spent[key]
    const button = <button type="button" className="btn delete" onClick={() => this.props.removePayment(key)}><TrashSvg /></button>
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
            border-top: 1px solid rgba(0,0,0,0.25);
            padding: 2em;
            overflow: auto;
            max-height: 200px;
          }
          table {
            width: 100%;
          }
          table th {
            text-align: left;
            min-width: 150px;
          }
          thead {
            border-bottom: 1px solid rgba(0,0,0,0.25);
          }
          th:last-child,
          td:last-child {
            text-align: right;
          }
          .btn.delete {
            border: none;
            line-height: normal;
          }
          .btn.delete:hover svg {
            fill: #0366d6;
          }
       `}</style>
      </section>
    )
  }
}
