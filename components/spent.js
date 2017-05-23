import React from 'react';
import PropTypes from 'prop-types';
import { dateString } from '../static/helpers';

export default class Spent extends React.Component {
  handleForm = e => {
    e.preventDefault();
    const payment = {
      date: new Date().toString().slice(0, -15),
      payment: +this.input.value
    };
    this.props.addPayment(payment);
    this.form.reset();
  };
  render() {
    return (
      <section className="spent">
        <form
          action=""
          ref={input => (this.form = input)}
          onSubmit={e => this.handleForm(e)}
        >
          <label htmlFor="spent">
            How much did you just spend?
          </label>
          <input
            type="number"
            step="00.01"
            id="spent"
            placeholder="$000.00"
            ref={input => {
              this.input = input;
            }}
            required
          />
          <button type="submit" className="btn">Spent</button>
        </form>
      </section>
    );
  }
}

Spent.PropTypes = {
  addPayment: PropTypes.func.isRequired
};
