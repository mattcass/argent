export default class BudgetForm extends React.Component {
  handleForm = e => {
    e.preventDefault()
    const userBudget = this.input.value
    this.props.updateBudget(userBudget)
    this.form.reset()
    this.props.showHide()
  }

  render() {
    return (
      <form
        className="mt1"
        action=""
        ref={input => (this.form = input)}
        onSubmit={e => this.handleForm(e)}
      >
        <input
          type="number"
          id="budget"
          placeholder="$0000.00"
          required
          ref={input => {
            this.input = input
          }}
        />
        <button type="submit" className="btn">Budget</button>
      </form>
    )
  }
}
