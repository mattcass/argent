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
import { monthRemainingCash, monthSpentCash } from '../static/helpers'

import BarGraphSvg from '../static/icons/bar-graph.svg'
import PaperSvg from '../static/icons/paper.svg'
import HeadSvg from '../static/icons/head.svg'
import GithubSvg from '../static/icons/github.svg'

const initialState = {
  spent: {},
  budget: 0,
  uid: null,
  user: null
}

export default class App extends React.Component {
  constructor() {
    super()
    let state = { ...initialState }
    this.state = state
  }

  componentWillMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user })
      }
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.spentRef)
    base.removeBinding(this.budgetRef)
  }

  filterDataByMonth = () => {
    const month = new Date().toLocaleString('en-us', { month: 'short' })
    const spent = { ...this.state.spent }
    const newArr = Object.keys({
      ...this.state.spent
    }).map((val, index, arr) => {
      if (spent[val].date.split(' ')[1] !== month) {
        spent[val] = null
      }
      return arr
    })
    this.setState({
      spent
    })
  }

  authenticate = provider => {
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

    this.spentRef = base.syncState(`users/${this.state.uid}/spent/`, {
      context: this,
      state: 'spent'
    })
    this.budgetRef = base.syncState(`users/${this.state.uid}/budget/`, {
      context: this,
      state: 'budget'
    })
  }

  logout = () => {
    base.unauth()
    this.reset()
  }

  reset = () => {
    this.setState({
      uid: null,
      user: null
    })
    location.reload()
  }

  updateBudget = userBudget => {
    this.setState({
      budget: parseFloat(userBudget)
    })
  }

  removePayment = key => {
    if (confirm('Are you sure you would like to remove this payment?')) {
      const spent = { ...this.state.spent }
      spent[key] = null
      this.setState({
        spent
      })
    }
  }

  addPayment = payment => {
    const spent = { ...this.state.spent }
    const timestamp = Date.now()
    spent[`${timestamp}`] = payment
    this.setState({
      spent
    })
  }

  render() {
    const month = new Date().toLocaleString('en-us', { month: 'long' })
    const spent = monthSpentCash(this.state.spent)
    const total = monthRemainingCash(this.state.spent, this.state.budget)

    return (
      <div className="app">
        <AppHeader />
        <header className="header">
          <h1>L’Argent</h1>
          {!this.state.uid
            ? <button
                className="btn icon"
                onClick={() => this.authenticate('github')}
              >
                <GithubSvg />
                Login with Github
              </button>
            : <div className="flex">
                <img src={this.state.user.photoURL} />
                <button className="btn icon" onClick={() => this.logout()}>
                  Log Out
                </button>
              </div>}
        </header>
        <main className="main">
          <div className="main-content">
            <header className="description">
              <h2>
                You have spent ${spent} this month.
              </h2>
              <h3>
                You still have ${total} left the for the month of {month}.
              </h3>
            </header>
            <Spent addPayment={this.addPayment} />
            <Budget
              budget={this.state.budget}
              updateBudget={this.updateBudget}
            />
          </div>
          <Pie data={[spent, total]} />
        </main>
        <aside>
          <Payments
            className="payments"
            spent={this.state.spent}
            removePayment={this.removePayment}
          />
        </aside>
        <section>
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
            overflow-x: hidden;
            background: #fff;
          }
          h1 {
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 1.1px;
          }
          h2, h3 {
            line-height: 1.25;
            font-size: 29px;
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
            background: #31343D;
            color: white;
            @media (min-width:500px){
              padding: 0.5em 1em;
            }
          }
          .flex {
            display: flex;
          }
          img {
            width: 80px;
            height: 80px;
            margin-right: 10px;
            border-radius: 100%;
            margin-bottom: -50px;
          }
          .main {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            max-width: 1200px;
            padding: 1em;
            margin: 0 auto;
            margin-top: 2em;
          }
          .main-content {
            max-width: 600px;
          }
          .tabs {
            display: flex;
            padding-left: 4em;
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
          input:invalid {
            box-shadow: none;
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
            align-items: center;
            color: #fff;
            background: #31343D;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
          }
          .btn.icon svg {
            margin-right: 10px;
            width: 16px;
            fill: #fff;
          }
          .btn.icon:hover,
          .btn.icon:focus {
            background-color: #fff;
            color: #31343D;
          }
          .btn.icon:hover svg,
          .btn.icon:focus svg {
            fill: #31343D;
          }
          .btn.icon:active {
            box-shadow: inset 0 0.15em 0.3em rgba(27,31,35,0.15);
          }
          .payment-list li {
            margin-top: 0.25em;
            display: flex;
          }
          .payment-amount {
            min-width: 150px;
          }
          .payments {
            display: none;

          }
          .mt1 {
            margin-top: 1em;
          }
          @media (max-width:500px){
            .header {
              padding: 0.5em 1em;
            }
            img {
              width: 40px;
              height: 40px;
              margin-bottom: 0;
            }
          }
       `}</style>
      </div>
    )
  }
}
