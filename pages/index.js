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
    owner: null
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
      owner: authData.user.uid,
      uid: authData.user.uid
    })

    this.spentRef = base.syncState(`users/${this.state.owner}/spent/`,
      {
        context: this,
        state: 'spent'
      }
    )
    this.budgetRef = base.syncState(`users/${this.state.owner}/budget/`,
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

    const logout = <button onClick={() => this.logout()}>Log Out!</button>

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
          {logout}
        </header>
        <main className="main">
          <section>
            <Budget budget={this.state.budget} updateBudget={this.updateBudget}/>
            <h1>You currently have ${total.toFixed(2)} left the for the month of {month}.</h1>
            <Spent addPayment={this.addPayment}/>
            <h2 className="header-font">You have spent ${spent.toFixed(2)} already this month.</h2>
          </section>
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
          .header-font {
            font-family: Georgia, serif;
          }
          h1 {
            font-weight: bold;
            line-height: 1.25;
            color: #000;
            font-family: Georgia, serif;
            font-size: 2em;
            font-size: 28px;
          }
          .app {

          }
          .header {
            display: flex;
            align-items: flex-end;
            padding: 1em;
            border-bottom: 1px solid #f9f9f9;
            background: #f1f1f1;
          }
          .main {
            width: 50%;
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
          label + button {
            width: 10%;
            display: inline-block;
            padding: 0.75em;
            border-radius: 2px;
            border: 1px solid;
          }
          .btn {
            padding: 1em;
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
