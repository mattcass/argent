
export default class BudgetForm extends React.Component {
  handleForm = (e) => {
    e.preventDefault();
    const userBudget = this.input.value
    this.props.updateBudget(userBudget);
    this.form.reset();
    this.props.changeBudget()
  }

  render() {

    return (
      <form className="mt1" action="" ref={(input) => this.form = input} onSubmit={(e) => this.handleForm(e)}>
        <label htmlFor="budget">
          What is your budget for the month?
        </label>
        <input
          type="number"
          id="budget"
          placeholder="$0000.00"
          required
          ref={(input) => {this.input = input }} />
        <button type="submit" className="btn">Budget</button>
      </form>
    )
  }
}
