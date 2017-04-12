import React from 'react'

export default class Budget extends React.Component {

  handleForm = (e) => {
    e.preventDefault();
    const userBudget = this.input.value
    this.props.updateBudget(userBudget);
    this.form.reset();
  }

  render() {

    return (
      <form action="" ref={(input) => this.form = input} onSubmit={(e) => this.handleForm(e)}>
        <p>Your monthly budget is currently: ${(+this.props.budget).toFixed(2)}</p>
        <label>
          What is your new budget?
          <input
            type="number"
            ref={(input) => {this.input = input }} />
          </label>
        <button type="submit">$</button>
      </form>
    )

  }

}
