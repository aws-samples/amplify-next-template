"use client";

import { useMemo, useState } from "react";
import "./../app/app.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Entry = {
  id: number;
  description: string;
  amount: number;
};

type MonthData = {
  month: string;
  income: Entry[];
  expenses: Entry[];
};

const createInitialMonths = (): MonthData[] =>
  MONTHS.map((month) => ({
    month,
    income: [],
    expenses: [],
  }));

export default function App() {
  const [months, setMonths] = useState<MonthData[]>(createInitialMonths());
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [newIncome, setNewIncome] = useState({ description: "", amount: "" });
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

  const selectedMonth = months[selectedMonthIndex];

  const totals = useMemo(() => {
    const monthIncomeTotal = selectedMonth.income.reduce(
      (sum, entry) => sum + entry.amount,
      0,
    );
    const monthExpensesTotal = selectedMonth.expenses.reduce(
      (sum, entry) => sum + entry.amount,
      0,
    );
    const yearIncomeTotal = months.reduce(
      (sum, month) =>
        sum + month.income.reduce((monthSum, entry) => monthSum + entry.amount, 0),
      0,
    );
    const yearExpensesTotal = months.reduce(
      (sum, month) =>
        sum + month.expenses.reduce((monthSum, entry) => monthSum + entry.amount, 0),
      0,
    );

    return {
      monthIncomeTotal,
      monthExpensesTotal,
      monthProfit: monthIncomeTotal - monthExpensesTotal,
      yearIncomeTotal,
      yearExpensesTotal,
      yearProfit: yearIncomeTotal - yearExpensesTotal,
    };
  }, [months, selectedMonth]);

  const addEntry = (
    type: "income" | "expenses",
    description: string,
    amountString: string,
  ) => {
    const amount = Number(amountString);
    if (!description.trim() || Number.isNaN(amount)) {
      return;
    }

    const entry: Entry = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      description: description.trim(),
      amount: Math.abs(amount),
    };

    setMonths((prev) =>
      prev.map((month, index) =>
        index !== selectedMonthIndex
          ? month
          : {
              ...month,
              [type]: [...month[type], entry],
            },
      ),
    );

    if (type === "income") {
      setNewIncome({ description: "", amount: "" });
    } else {
      setNewExpense({ description: "", amount: "" });
    }
  };

  const removeEntry = (type: "income" | "expenses", id: number) => {
    setMonths((prev) =>
      prev.map((month, index) =>
        index !== selectedMonthIndex
          ? month
          : {
              ...month,
              [type]: month[type].filter((entry) => entry.id !== id),
            },
      ),
    );
  };

  return (
    <main className="page">
      <section className="calc-card">
        <header className="header">
          <div>
            <p className="eyebrow">Profit Calculator</p>
            <h1>Track income, expenses, and profit by month</h1>
            <p className="subtitle">
              Choose a month, add income and expense items, and watch totals update
              automatically across the selected month and the full year.
            </p>
          </div>
          <div className="year-summary">
            <div className="stat-card">
              <span className="stat-label">Year Income</span>
              <strong>${totals.yearIncomeTotal.toFixed(2)}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-label">Year Expenses</span>
              <strong>${totals.yearExpensesTotal.toFixed(2)}</strong>
            </div>
            <div className="stat-card profit">
              <span className="stat-label">Year Profit</span>
              <strong>${totals.yearProfit.toFixed(2)}</strong>
            </div>
          </div>
        </header>

        <div className="month-selector-row">
          <label htmlFor="month">Select month</label>
          <select
            id="month"
            value={selectedMonthIndex}
            onChange={(event) =>
              setSelectedMonthIndex(Number(event.target.value))
            }
          >
            {months.map((month, index) => (
              <option key={month.month} value={index}>
                {month.month}
              </option>
            ))}
          </select>
        </div>

        <div className="totals-grid">
          <div className="total-card">
            <span className="label">{selectedMonth.month} Income</span>
            <strong>${totals.monthIncomeTotal.toFixed(2)}</strong>
          </div>
          <div className="total-card">
            <span className="label">{selectedMonth.month} Expenses</span>
            <strong>${totals.monthExpensesTotal.toFixed(2)}</strong>
          </div>
          <div className="total-card profit-card">
            <span className="label">{selectedMonth.month} Profit</span>
            <strong>${totals.monthProfit.toFixed(2)}</strong>
          </div>
        </div>

        <div className="entry-section">
          <div className="entry-card">
            <h2>Add income</h2>
            <div className="entry-form">
              <input
                type="text"
                placeholder="Description"
                value={newIncome.description}
                onChange={(event) =>
                  setNewIncome((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
              />
              <input
                type="number"
                placeholder="Amount"
                value={newIncome.amount}
                onChange={(event) =>
                  setNewIncome((prev) => ({
                    ...prev,
                    amount: event.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={() =>
                  addEntry("income", newIncome.description, newIncome.amount)
                }
              >
                Add income
              </button>
            </div>
          </div>

          <div className="entry-card">
            <h2>Add expense</h2>
            <div className="entry-form">
              <input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(event) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(event) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    amount: event.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={() =>
                  addEntry("expenses", newExpense.description, newExpense.amount)
                }
              >
                Add expense
              </button>
            </div>
          </div>
        </div>

        <div className="entries-grid">
          <section className="entries">
            <div className="entries-header">
              <h3>Income</h3>
              <span>${totals.monthIncomeTotal.toFixed(2)}</span>
            </div>
            <ul>
              {selectedMonth.income.length === 0 ? (
                <li className="empty-state">No income items added yet.</li>
              ) : (
                selectedMonth.income.map((item) => (
                  <li key={item.id} className="entry-row">
                    <span>{item.description}</span>
                    <span>${item.amount.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => removeEntry("income", item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="entries">
            <div className="entries-header">
              <h3>Expenses</h3>
              <span>${totals.monthExpensesTotal.toFixed(2)}</span>
            </div>
            <ul>
              {selectedMonth.expenses.length === 0 ? (
                <li className="empty-state">No expense items added yet.</li>
              ) : (
                selectedMonth.expenses.map((item) => (
                  <li key={item.id} className="entry-row">
                    <span>{item.description}</span>
                    <span>${item.amount.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => removeEntry("expenses", item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>

        <div className="monthly-overview">
          <h2>Monthly overview</h2>
          <div className="month-summary-grid">
            {months.map((month) => {
              const incomeTotal = month.income.reduce(
                (sum, entry) => sum + entry.amount,
                0,
              );
              const expenseTotal = month.expenses.reduce(
                (sum, entry) => sum + entry.amount,
                0,
              );
              const profit = incomeTotal - expenseTotal;

              return (
                <article key={month.month} className="month-tile">
                  <h3>{month.month}</h3>
                  <div className="month-values">
                    <span>Income</span>
                    <strong>${incomeTotal.toFixed(2)}</strong>
                  </div>
                  <div className="month-values">
                    <span>Expenses</span>
                    <strong>${expenseTotal.toFixed(2)}</strong>
                  </div>
                  <div className={`month-values profit ${profit < 0 ? "negative" : ""}`}>
                    <span>Profit</span>
                    <strong>${profit.toFixed(2)}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
