import React, { Component } from "react";
import axios from "axios";

class AddTransaction extends Component {
  state = {
    type: "credit",
    amount: "",
    description: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { type, amount, description } = this.state;

    try {
      await axios.post("http://localhost:3000/transactions", {
        type,
        amount: parseFloat(amount),
        description,
      });
      this.props.history.push("/");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  render() {
    return (
      <div>
        <h2>Add Transaction</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Type</label>
            <select
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default AddTransaction;
