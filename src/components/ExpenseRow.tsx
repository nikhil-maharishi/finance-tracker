import { useContext } from 'react'
import { TransactionContext, type Transaction } from '../context/transactionContext'
import { categories } from '../utils/data'

type expenseProp = {
    expense:Transaction
}

const ExpenseRow = ({expense}:expenseProp) => {
    const {dispatch} = useContext(TransactionContext)!
    const deleteExpense = (category:string) => {
        dispatch({type:"REMOVE",payload:category})
    }
    const getIcon = () => {
        return categories.find((ele) => ele?.label == expense?.category)?.icon
    }
    return (
        <article className="expense-row">
            <div className="expense-row__icon">{getIcon()}</div>
            <div className="expense-row__body">
                <p className="expense-row__desc">{expense?.description}</p>
                <p className="expense-row__meta">{expense?.category} · {expense?.date}</p>
            </div>
            <span className="expense-row__amount" >₹{expense?.amount}</span>
            <button className="btn-danger-icon" type="button" onClick={()=>deleteExpense(expense?.category)} >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
            </button>
        </article>
    )
}

export default ExpenseRow