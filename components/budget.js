import BudgetForm from './budgetForm'
import { decimal } from '../static/helpers'

export default class Budget extends React.Component {
  state = {
    showBudget: false
  }

  changeBudget = () => {
    if ( this.props.budget !== 0 ) {
      this.setState(prevState => ({
      showBudget: !prevState.showBudget
      }));
    }
  }

  render() {

    if ( this.props.budget == 0 || this.state.showBudget ) {
      return (
        <section className="budget">
          <p>Your monthly budget is currently: ${decimal(this.props.budget)}</p>
          { this.props.budget == 0 ? null : <button type="button" className="btn" onClick={() => this.changeBudget()}>Cancel</button> }
          <BudgetForm updateBudget={this.props.updateBudget} changeBudget={this.changeBudget} />
        </section>
      )
    }

    return (
      <section className="budget">
        <p>Your monthly budget is currently: ${decimal(this.props.budget)}</p>
        <button type="button" className="btn" onClick={() => this.changeBudget()}>Update Budget</button>
      </section>
    )

  }

}
