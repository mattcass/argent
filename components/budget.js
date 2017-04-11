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
        <label>
          What is your budget for the month?
          <input
            type="number"
            ref={(input) => {this.input = input }}
            required />
          </label>
        <button type="submit">$</button>
      </form>
    )
  }

}
