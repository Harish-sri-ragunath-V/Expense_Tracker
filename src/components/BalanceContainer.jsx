import CurrencyItem from "./CurrencyItem"
const BalanceContainer = (props) => {
    const { expenses } = props;
    const incomeArr = expenses.filter((expense) => Number(expense.amount) > 0);
    const expenseArr = expenses.filter((expense) => Number(expense.amount) < 0);
    let income = 0;
    let expense = 0;

    incomeArr.forEach((item) => {
        income += Number(item.amount);
    })
    expenseArr.forEach((item) => {
        expense += Number(item.amount);
    })
    return (
        <div className="balance-container">
            <CurrencyItem title="Income" amount={income} type={"income"} />
            <CurrencyItem title="Expense" amount={expense} type={"expense"} />
            <CurrencyItem title="Balance" amount={income + expense} type={"balance"} />
        </div>
    )
}
export default BalanceContainer;