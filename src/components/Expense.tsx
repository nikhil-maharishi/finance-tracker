import { useContext, useMemo } from 'react'
import ExpenseRow from './ExpenseRow'
import { TransactionContext, type Transaction } from '../context/transactionContext';
import NoData from './NoData';
type expenseProp = {
    category?: string
    duration: '' | 'month' | 'week'
}
export type duration = '' | 'month' | 'week'
const Expense = ({ category, duration }: expenseProp) => {
    const { state } = useContext(TransactionContext)!;

    const finalExpenses = useMemo(() => {
        let data = category
            ? state.filter((ele) => ele.category === category)
            : state;

        if (duration === "month") {
            const currentMonth = new Date().getMonth();

            data = data.filter((ele) => {
                return new Date(ele.date).getMonth() === currentMonth;
            });
        }

        if (duration === "week") {
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);

            data = data.filter((ele) => {
                const expenseDate = new Date(ele.date);
                return expenseDate >= sevenDaysAgo && expenseDate <= today;
            });
        }

        return data;
    }, [state, category, duration]);

    const getFilterTotalExpense = () => {
        return finalExpenses.reduce((sum, ele) => sum + Number(ele.amount), 0)
    }

    return (
        <section id="panelList">
            <div id="expenseList" className="expense-list-wrapper">
                {finalExpenses.length > 0 ? (
                    finalExpenses.map((ele: Transaction, i: number) => (
                        <ExpenseRow key={i} expense={ele} />
                    ))
                ) : (
                    <NoData />
                )}
            </div>


            {state.length > 0 &&
                <div id="totalFooter" className="total-footer">
                    <span className="total-footer__count">
                        <span id="expenseCount">{finalExpenses.length}</span> Entries
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