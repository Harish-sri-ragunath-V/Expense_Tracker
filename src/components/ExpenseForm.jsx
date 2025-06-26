import { useEffect, useState } from "react";

const ExpenseForm = (props) => {
    const { itemToEdit } = props;
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState();
    const [error, setError] = useState("");

    const isEdit = itemToEdit;

    useEffect(() => {
        if (itemToEdit) {
            setTitle(itemToEdit.title);
            setAmount(itemToEdit.amount);
        } else {
            setTitle("");
            setAmount();
        }
    }, [itemToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Enter Title!");
            return;
        }
        if (!amount || isNaN(amount) || amount == 0) {
            setError("Enter a valid Amount.");
            return;
        }
        if (isEdit) props.editExpense(itemToEdit._id, title, Number(amount));
        else props.addExpense(title, Number(amount));
        setTitle("");
        setAmount();
        setError("");
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const handleCancel = () => {
        props.setItemToEdit(null);
        setTitle("");
        setAmount();
        setError("");
    }

    return (
        <div className="expense-form">
            {isEdit ? <div className="cancel"><h3>Edit Expense</h3> <button className="cancel-edit" onClick={handleCancel}>Cancel Edit</button></div> : <h3>Add Expense</h3>}
            <h4>{error}</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" value={amount} onChange={handleAmountChange} />
                </div>
                <button type="submit">{isEdit ? "Edit Expense" : "Add Expense"}</button>
            </form>
        </div>
    )
}
export default ExpenseForm;
