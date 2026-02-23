import React from 'react'
import type { ModalProps } from './AddTransactionModal'

const AddBudgetLimit = ({ showModal, setShowModal }: ModalProps) => {
    return (
        <div id="modalBudget" className={`modal-overlay ${showModal?'':'hidden'}`}>

            <div className="modal modal--sm">
                <h2 id="modalBudgetTitle" className="modal__title">Monthly Budget</h2>
                <p className="modal__subtitle">Set your spending limit for the month</p>

                <label >Limit Amount (₹)</label>
                <input id="budgetInput" className="input-field" type="number" min="0" step="100" placeholder="e.g. 30000" />

                <div className="form-actions">
                    <button className="btn btn-ghost" id="btnCancelBudget" type="button" onClick={setShowModal} >Cancel</button>
                    <button className="btn btn-primary" id="btnSaveBudget" type="button">Save Budget</button>
                </div>
            </div>
        </div>
    )
}

export default AddBudgetLimit