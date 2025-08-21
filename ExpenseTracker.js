import React, { useState } from "react";
import "./ExpenseTracker.css";

function ExpenseTracker() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([
    { title: "Groceries", amount: 85.50 },
    { title: "Gas Station", amount: 45.00 },
    { title: "Coffee Shop", amount: 12.75 },
    { title: "Movie Tickets", amount: 32.00 },
    { title: "Restaurant", amount: 67.25 }
  ]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  function cart(){
    
  }

  const addExpense = () => {
    if (!title || !amount) return;
    setExpenses([...expenses, { title, amount: parseFloat(amount) }]);
    setTitle("");
    setAmount("");
  };

  const selectExpense = (expense) => {
    const exists = selectedExpenses.some(
      (e) => e.title === expense.title && e.amount === expense.amount
    );
    if (!exists) {
      setSelectedExpenses([...selectedExpenses, expense]);
    }
  };

  const removeSelectedExpense = (indexToRemove) => {
    setSelectedExpenses(selectedExpenses.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="expense-container">
      <h2 className="expense-title">Expense Tracker</h2>
      
      <div className="expense-form">
        <div className="form-group">
          <input
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter expense title..."
          />
          <input
            className="form-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
          <button className="add-btn" onClick={addExpense}>
            Add Expense
          </button>
        </div>
      </div>

      <div className="expenses-list">
        <h3 className="expenses-title">Expenses List</h3>
        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💰</div>
            <p>No expenses added yet. Start tracking your spending!</p>
          </div>
        ) : (
          expenses.map((exp, i) => (
            <div key={i} className="expense-item">
              <span className="expense-name">{exp.title}</span>
              <span className="expense-amount">${exp.amount.toFixed(2)}</span>
              <button className="select-btn" onClick={() => selectExpense(exp)}>
                Select
              </button>
            </div>
          ))
        )}
      </div>

      <div className="selected-section">
        <h3 className="selected-title">Selected Items</h3>
        {selectedExpenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🧾</div>
            <p>No items selected. Choose from the list above.</p>
          </div>
        ) : (
          <div className="selected-grid">
            {selectedExpenses.map((exp, i) => (
              <div key={`${exp.title}-${exp.amount}-${i}`} className="selected-card">
                <div className="selected-name">{exp.title}</div>
                <div className="selected-amount">${exp.amount.toFixed(2)}</div>
                <button className="remove-btn" onClick={() => removeSelectedExpense(i)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="total-section">
        <h3 className="total-title">Total Expenses</h3>
        <div className="total-amount">
          ${expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
