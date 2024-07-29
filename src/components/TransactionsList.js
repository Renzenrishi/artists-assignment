import React, { Component } from "react";
import axios from "axios";

class TransactionsList extends Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      this.setState({ transactions: response.data.transactions });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  render() {
    return (
      <div>
        <h2>Transactions List</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>
                  {transaction.type === "credit" ? transaction.amount : ""}
                </td>
                <td>
                  {transaction.type === "debit" ? transaction.amount : ""}
                </td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionsList;
