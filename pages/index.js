import React from 'react'
import Head from 'next/head'

import Budget from '../components/budget'
import Spent from '../components/spent'
import Payments from '../components/payments'
import Graph from '../components/graph'
import base from '../static/base'
import sampleData from '../static/sampleData'

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

  renderLogin = () => {
    return (
      <div>
        <h2>CASH APP</h2>
        <p>Login to manage your monthly budget</p>
        <button type="button" className="github btn" onClick={() => this.authenticate('github')}>Login with Github</button>
      </div>
    )
  }

  render() {
    const spentCash = Object.keys(this.state.spent)
    const total = spentCash.reduce((prevTotal, key) => {
      const spent = this.state.spent[key].payment
      return prevTotal - spent
    }, +this.state.budget)

    const spent = spentCash.reduce((sum, key) => {
      const spent = this.state.spent[key].payment
      return sum + spent
    }, 0)

    const month = new Date().toLocaleString('en-us', { month: 'long'})

    // check if they are logged in!
    if ( !this.state.uid ) {
      return (
        <div>
          {this.renderLogin()}
        </div>
      )
    }

    return (
      <div className="app">
        <Head>
          <title>cash $</title>
          <meta name="description" content="cash rules everything around me"/>
          <meta viewport="viewport" contnet="initial-scale=1.0 width=device-width" />
        </Head>

        <header className="header">
          <img src={this.state.user.photoURL} />
          <button className="btn" onClick={() => this.logout()}>Log Out</button>
        </header>
        <main className="main">
          <header>
          <h1 className="highlight">
            You currently have ${total.toFixed(2)} left the for the month of {month}.
          </h1>
          <h2 className="highlight">
            You have spent ${spent.toFixed(2)} already this month.
          </h2>
          </header>

          <Spent addPayment={this.addPayment}/>
          <Budget budget={this.state.budget} updateBudget={this.updateBudget}/>
          <Payments
            spent={this.state.spent}
            removePayment={this.removePayment}
          />
        </main>
        <aside className="aside">
          <Graph data={this.state.spent} />
        </aside>
        <style>{`
          * {
            box-sizing: border-box;
          }
          * + * {
            margin-top: 1em;
          }
          html, body  {
            padding: 0;
            margin: 0;
            font-family: -apple-system,BlinkMacSystemFont,avenir
              next,avenir,helvetica,helvetica neue,ubuntu,roboto,noto,segoe
              ui,arial,sans-serif;

          }
          .highlight {
            font-family: Georgia, serif;
          }
          h1, h2 {
            line-height: 1.25;
            color: #000;
            font-size: 2em;
            font-size: 24px;
            letter-spacing: 1.2px;
            display: inline;
            margin: 0;
          }
          .app {

          }
          .header {
            display: flex;
            justify-content: space-between;
            padding: 1em;
            border-bottom: 1px solid #f9f9f9;
            background: #f1f1f1;
          }
          img {
            width: 60px;
            border-radius: 100%;
          }
          .main {
            padding: 3em 4em;

          }
          .aside {
            width: 100%;
            margin-top: 5em;
          }
          ul {
            padding: 0;
            list-style-type: none;
          }
          input {
            width: 80%;
            margin-top: 1em;
            padding: 0.75em;
            margin-right: 0.25em;
            border-radius: 2px;
            border: 1px solid;
            min-width: 100px;
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
            text-transform: uppercase;
            vertical-align: middle;
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
