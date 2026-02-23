
import { useContext, useRef } from 'react'
import type { ModalProps } from './AddTransactionModal'
import { BudgetContext } from '../context/transactionContext'

const AddBudgetLimit = ({ showModal, setShowModal }: ModalProps) => {
    const { dispatch } = useContext(BudgetContext)!
    const budgetRef = useRef<HTMLInputElement | null>(null)
    const onSubmit = () => {
        const value = Number(budgetRef.current?.value);
        dispatch({type:"ADD",payload:value})
        setShowModal()
    }
    return (
        <div id="modalBudget" className={`modal-overlay ${showModal?'':'hidden'}`}>

            <div className="modal modal--sm">
                <h2 id="modalBudgetTitle" className="modal__title">Monthly Budget</h2>
                <p className="modal__subtitle">Set your spending limit for the month</p>

                <label >Limit Amount (₹)</label>
                <input id="budgetInput" className="input-field" type="number" min="0" step="100" placeholder="e.g. 30000" ref={budgetRef} />

                <div className="form-actions">
                    <button className="btn btn-ghost" id="btnCancelBudget" type="button" onClick={setShowModal} >Cancel</button>
                    <button className="btn btn-primary" id="btnSaveBudget" type="button" onClick={onSubmit} >Save Budget</button>
                </div>
            </div>
        </div>
    )
}

export default AddBudgetLimit