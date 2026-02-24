import { useContext, useMemo } from 'react'
import ExpenseRow from './ExpenseRow'
import { TransactionContext, type Transaction } from '../context/transactionContext';
import NoData from './NoData';
type expenseProp = {
    category?: string
    duration?: string
}
const Expense = ({ category, duration }: expenseProp) => {
    const { state } = useContext(TransactionContext)!;

    const getTotalExpense = () => {
        return state.reduce((sum, ele) => sum + Number(ele.amount), 0)

    }
    const filteredExpenses = useMemo(() => {
        return category
            ? state.filter((ele) => ele.category === category)
            : state;
    }, [state, category]);

    const getFilterTotalExpense = () => {
        return filteredExpenses.reduce((sum, ele) => sum + Number(ele.amount), 0)
    }

    return (
        <section id="panelList">
            <div id="expenseList" className="expense-list-wrapper">
                {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((ele: Transaction, i: number) => (
                        <ExpenseRow key={i} expense={ele} />
                    ))
                ) : (
                    <NoData />
                )}
            </div>


            {state.length > 0 &&
                <div id="totalFooter" className="total-footer">
                    <span className="total-footer__count">
                        <span id="expenseCount">{filteredExpenses.length}</span> Entries
                    </span>
                    <span className="total-footer__amount">
                        Total: <span id="totalAmt">₹{getFilterTotalExpense()}</span>
                    </span>
                </div>
            }


        </section>
    )
}

export default Expense