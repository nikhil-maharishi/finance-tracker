import { useContext } from 'react'
import { categories } from '../utils/data';
import type { Category } from '../utils/interface';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../utils/schemas/AddTransactionForm.schema';
import { TransactionContext } from '../context/transactionContext';
export type ModalProps = {
    showModal: boolean;
    setShowModal: () => void;
};
const AddTransactionModal = ({ showModal, setShowModal }: ModalProps) => {
    const currentDate = new Date()
    const { dispatch } = useContext(TransactionContext)!;
    const { register, handleSubmit,reset, formState: { errors }, } = useForm({
        resolver: yupResolver(transactionSchema),
        defaultValues: {
            amount: '',
            date: currentDate.toString(),
            category: '',
            description: ''
        },
        mode: "all"
    });

    const onSubmit = (data: any) => {
        dispatch({ type: "ADD", payload: data });
          reset({
            amount: '',
            date: '',
            category: '',
            description: ''
        });
        setShowModal()
    };

    return (
        <div id="modalAdd" className={`modal-overlay ${showModal ? '' : 'hidden'}`}>

            <div className="modal">

                {/* <!-- Modal header --> */}
                <div className="modal__header">
                    <div>
                        <h2 id="modalAddTitle" className="modal__title">New Expense</h2>
                        <p className="modal__subtitle">Record where your money went</p>
                    </div>
                    <button className="btn-icon-close" id="btnCloseAdd" type="button" aria-label="Close modal" onClick={setShowModal} >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* <!-- Add expense form --> */}
                <p id="formError" className="form-error hidden" role="alert"></p>

                <form id="expenseForm" className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-grid-2">
                        <div>
                            <label>Amount (₹)</label>
                            <input id="fAmount" className="input-field" type="number" {...register("amount")} placeholder="0.00" />
                            {errors.amount && (
                                <p id="formError" className="input-error">{errors.amount.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Date</label>
                            <input id="fDate" className="input-field" type="date" {...register("date")} />
                            {errors.date && (
                                <p id="formError" className="input-error">{errors.date.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label>Category</label>
                        <select id="fCategory" className="input-field"  {...register("category")}>
                            <option selected disabled value="">Select Category</option>
                            {categories.map((cat: Category) => (
                                <option key={cat.id} value={cat.label}>{cat?.icon} {cat.label}</option>
                            ))}
                        </select>
                        {errors.category && (
                            <p id="formError" className="input-error">{errors.category.message}</p>
                        )}
                    </div>

                    <div>
                        <label>Description</label>
                        <input id="fDesc" className="input-field" type="text" placeholder="What did you spend on?" {...register("description")} />
                        {errors.description && (
                            <p id="formError" className="input-error">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-ghost" id="btnCancelAdd" onClick={setShowModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Entry</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddTransactionModal