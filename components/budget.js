import { decimal } from '../static/helpers'

export default class Budget extends React.Component {

  handleForm = (e) => {
    e.preventDefault();
    const userBudget = this.input.value
    this.props.updateBudget(userBudget);
    this.form.reset();
  }

  render() {

    return (
      <section className="budget">
        <p>Your monthly budget is currently: ${decimal(this.props.budget)}</p>
        <form action="" ref={(input) => this.form = input} onSubmit={(e) => this.handleForm(e)}>
          <label htmlFor="budget">
            What is your new budget?
          </label>
          <input
            type="number"
            id="budget"
            placeholder="$0000.00"
            required
            ref={(input) => {this.input = input }} />
          <button type="submit" className="btn">Budget</button>
        </form>
      </section>
    )

  }

}
