import React from 'react'

import AppHeader from '../components/head'
import Login from '../components/login'
import Budget from '../components/budget'
import Spent from '../components/spent'
import Payments from '../components/payments'
import Graph from '../components/graph'
import Pie from '../components/pieChart'
import base from '../static/base'
import sampleData from '../static/sampleData'
import { decimal } from '../static/helpers'

import BarGraphSvg from '../static/icons/bar-graph.svg';
import PaperSvg from '../static/icons/paper.svg';

export default class App extends React.Component {
  state = {
    spent: {},
    budget: 0,
    uid: null,
    user: null
  }

  componentWillMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user});
      }
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.spentRef)
    base.removeBinding(this.budgetRef)
  }

  authenticate = (provider) => {
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler = (err, authData) => {
    if (err) {
      console.log(err)
      return
    }

    this.setState({
      user: authData.user,
      uid: authData.user.uid
    })

    this.spentRef = base.syncState(`users/${this.state.uid}/spent/`,
      {
        context: this,
        state: 'spent'
      }
    )
    this.budgetRef = base.syncState(`users/${this.state.uid}/budget/`,
      {
        context: this,
        state: 'budget'
      }
    )
  }

  logout = () => {
    base.unauth()
    this.setState({
      owner: null,
      uid: null
    })
  }

  updateBudget = (userBudget) => {
    this.setState({
      budget: userBudget
    })
  }

  removePayment = (key) => {
    if (confirm('Are you sure you would like to remove this payment?')) {
      const spent = {...this.state.spent}
      spent[key] = null;
      this.setState({
        spent
      })
    }
  }

  addPayment = (payment) => {
    const spent = {...this.state.spent}
    const timestamp = Date.now();
    spent[`${timestamp}`] = payment;
    this.setState({
      spent
    })
  }

  render() {
    let spentCash = Object.keys(this.state.spent)
    let total = spentCash.reduce((prevTotal, key) => {
      let spent = this.state.spent[key].payment
      return prevTotal - spent
    }, this.state.budget)

    let spent = spentCash.reduce((sum, key) => {
      let spent = this.state.spent[key].payment
      return sum + spent
    }, 0)

    const month = new Date().toLocaleString('en-us', { month: 'long'})

    // check if they are logged in!
    if ( !this.state.uid ) {
      return (
        <Login authenticate={this.authenticate}/>
      )
    }

    return (
      <div className="app">
        <AppHeader />
        <header className="header">
          <h1>L&#8217;Argent</h1>
          <div className="flex">
            <img src={this.state.user.photoURL} />
            <button className="btn link" onClick={() => this.logout()}>
              Log Out
            </button>
          </div>
        </header>
        <main className="main">
          <div className="main-content">
            <header className="description">
              <h2>
                You have spent ${decimal(spent)} this month.
              </h2>
              <h3>
                You still have ${decimal(total)} left the for the month of {month}.
              </h3>
            </header>
            <Spent addPayment={this.addPayment}/>
            <Budget budget={this.state.budget} updateBudget={this.updateBudget} />
          </div>
          <div>
            <Pie data={[+decimal(spent), +decimal(total)]}/>
          </div>
        </main>
        <section>
          <button className="btn icon" type="button">
            <BarGraphSvg />
            Graph
          </button>
          <button className="btn icon" type="button">
            <PaperSvg />
            Table
          </button>
          <Payments spent={this.state.spent} removePayment={this.removePayment} />
          <Graph data={this.state.spent} />
        </section>
        <style>{`
          * {
            box-sizing: border-box;
          }
          html, body  {
            margin: 0;
            line-height: 1.5;
            color: #111;
            font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
          }
          h1 {
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 1.1px;
          }
          h2, h3 {
            line-height: 1.25;
            font-size: 24px;
            font-family: Georgia, serif;
            letter-spacing: 1.2px;
            display: inline;
            margin: 0;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5em 4em;
            border-bottom: 1px solid #f9f9f9;
            background: #f1f1f1;
          }
          .flex {
            display: flex;
          }
          img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 100%;
          }
          .main {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            align-items: center;
          }
          .main-content {
            max-width: 600px;
            padding: 2em 4em;
          }
          .description {
            margin: 2em 0 0 0;
          }
          .spent, .budget {
            margin: 4em 0;
          }
          ul {
            padding: 0;
            list-style-type: none;
          }
          input {
            margin-top: 1em;
            padding: 6px 12px;
            font-size: 14px;
            flex-grow: 1;
            margin: 0;
            line-height: 20px;
            margin-right: 0.25em;
            border-radius: 0.25em;
            border: 1px solid rgba(27,31,35,0.2);
          }
          form {
            display: flex;
            flex-wrap: wrap;
          }
          label {
            width: 100%;
            margin-bottom: 0.75em;
          }
          .btn {
            color: #0366d6;
            background-color: #fff;
            position: relative;
            display: inline-block;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            white-space: nowrap;
            vertical-align: middle;
            margin: 0;
            cursor: pointer;
            user-select: none;
            border: 1px solid rgba(27,31,35,0.2);
            border-radius: 0.25em;
            appearance: none;
          }
          .btn:hover,
          .btn:focus {
            background-color: #f6f8fa;
          }
          .btn:active {
            box-shadow: inset 0 0.15em 0.3em rgba(27,31,35,0.15);
          }
          .btn.link {
            border: none;
            background: transparent;
          }
          .btn.icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            margin-left: 10px;
            min-width: 120px;
          }
          .btn.icon svg {
            margin-right: 10px;
          }
          .payment-list li {
            margin-top: 0.25em;
            display: flex;
          }
          .payment-amount {
            min-width: 150px;
          }
       `}</style>
      </div>
    )
  }
}
