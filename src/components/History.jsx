import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";

const History = (props) => {
    const { expenses } = props;

    const [filteredExpenses, setFilteredExpenses] = useState(expenses);

    useEffect(() => {
        setFilteredExpenses(expenses);
    }, [expenses]);

    const incFilter = () => {
        setFilteredExpenses(expenses.filter(expense => Number(expense.amount) > 0));
    }
    const expFilter = () => {
        setFilteredExpenses(expenses.filter(expense => Number(expense.amount) < 0));
    }
    const allFilter = () => {
        setFilteredExpenses(expenses);
    }
    return (
        <div className="history">
            <div className="his-filter">
                <h3>History</h3>
                <button onClick={allFilter}>All</button>
                <button onClick={incFilter}>Income</button>
                <button onClick={expFilter}>Expense</button>
            </div>
            {filteredExpenses.length ? filteredExpenses.map(expense => (
                <ExpenseItem
                    key={expense._id}
                    expense={expense}
                    deleteExpense={props.deleteExpense}
                    setItemToEdit={props.setItemToEdit}
                />
            )) : <h4>No Expenses Found!</h4>}
        </div>
    )
}
export default History;