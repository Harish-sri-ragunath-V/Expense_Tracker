import { useState, useEffect } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import BalanceContainer from "./BalanceContainer";

const ExpenseContainer = () => {
    const [expenses, setExpenses] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null);

    // const addExpense = (title, amount) => {
    //     setExpenses([
    //         ...expenses, {
    //             id: uid(),
    //             title,
    //             amount,
    //         },
    //     ])
    // }

    const FetchExpense = async () => {
        try {
            const response = await fetch('https://expense-tracker-server-ilbi.onrender.com/expense');
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    }
    useEffect(() => {
        FetchExpense();
    }, []);

    const addExpense = async (title, amount) => {
        try {
            const response = await fetch('https://expense-tracker-server-ilbi.onrender.com/expense', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, amount }),
            });
            const data = await response.json();
            setExpenses([...expenses, data]);
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    }

    // const deleteExpense = (id) => {
    //     setExpenses(expenses.filter(exp => exp.id != id))
    // }

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`https://expense-tracker-server-ilbi.onrender.com/expense/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                await FetchExpense();
            } else {
                console.error("Error deleting expense:", response.statusText);
            }
        }
        catch (error) {
            console.error("Error deleting expense:", error);
        }
    }

    // const editExpense = (id, title, amount) => {
    //     setExpenses(expenses.map(exp => {
    //         if (exp.id == id) {
    //             return { id, title, amount }
    //         }
    //         return exp;
    //     }))
    //     setItemToEdit(null);
    // }

    const editExpense = async (id, title, amount) => {
        try {
            const response = await fetch(`https://expense-tracker-server-ilbi.onrender.com/expense/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, amount }),
            });
            if (response.ok) {
                await FetchExpense();
            }
            else {
                console.error("Error editing expense:", response.statusText);
            }
        } catch (error) {
            console.error("Error editing expense:", error);
        }
    }

    return (
        <div className="expense-container">
            <h2>Expense Tracker</h2>
            <BalanceContainer expenses={expenses} />
            <History expenses={expenses} deleteExpense={deleteExpense} setItemToEdit={setItemToEdit} />
            <ExpenseForm addExpense={addExpense} itemToEdit={itemToEdit} editExpense={editExpense} setItemToEdit={setItemToEdit} />
        </div>
    )
}
export default ExpenseContainer;
