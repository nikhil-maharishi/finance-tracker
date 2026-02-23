import { useContext } from 'react'
import ExpenseRow from './ExpenseRow'
import { TransactionContext, type Transaction } from '../context/transactionContext';
import NoData from './NoData';

const Expense = () => {
    const { state } = useContext(TransactionContext)!;

    const getTotalExpense = () => {
        return state.reduce((sum, ele) => sum + Number(ele.amount), 0)

    }
    
    return (
        <section id="panelList">
            <div id="expenseList" className="expense-list-wrapper">
                {state && state.length> 0 ? state.map((ele:Transaction)=>(
                    <ExpenseRow key={ele?.description} expense={ele} />
                )):<NoData/>}
            </div>


            {state.length> 0 && 
                <div id="totalFooter" className="total-footer">
                    <span className="total-footer__count">
                        <span id="expenseCount">{state.length}</span> Entries
                    </span>
                    <span className="total-footer__amount">
                        Total: <span id="totalAmt">₹{getTotalExpense()}</span>
                    </span>
                </div>
            }
            

        </section>
    )
}

export default Expense