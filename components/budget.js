import BudgetForm from './budgetForm'
import { decimal } from '../static/helpers'

export default class Budget extends React.Component {
  state = {
    showHide: false
  }

  showHide = () => {
    if (this.props.budget !== 0) {
      this.setState(prevState => ({
        showHide: !prevState.showHide
      }))
    }
  }

  render() {
    if (this.props.budget == 0 || this.state.showHide) {
      return (
        <section className="budget">
          <p>Your monthly budget is currently: ${decimal(this.props.budget)}</p>
          {this.props.budget == 0
            ? <label htmlFor="budget">
                Set a budget for the month!
              </label>
            : <div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => this.showHide()}
                >
                  Cancel
                </button>
                <p>
                  <label htmlFor="budget">
                    What is your new budget for the month?
                  </label>
                </p>
              </div>}
          <BudgetForm
            updateBudget={this.props.updateBudget}
            showHide={this.showHide}
          />
        </section>
      )
    }

    return (
      <section className="budget">
        <p>Your monthly budget is currently: ${decimal(this.props.budget)}</p>
        <button type="button" className="btn" onClick={() => this.showHide()}>
          Update Budget
        </button>
      </section>
    )
  }
}
