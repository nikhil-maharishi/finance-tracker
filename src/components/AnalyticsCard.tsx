import { useContext, useState } from "react"
import AddBudgetLimit from "./AddBudgetLimit"
import { BudgetContext } from "../context/transactionContext"

type cardProp = {
  title: string,
  value: string,
  modalType?: string
}
const AnalyticsCard = ({ title, value, modalType }: cardProp) => {
  
  const [showModalType, setShowModalType] = useState<string| undefined>('')
  const openModal = (): void => {
        setShowModalType(modalType);
    };

    const closeModal = (): void => {
        setShowModalType('');
    };
  return (
    <>
      <AddBudgetLimit showModal={showModalType == 'budget'} setShowModal={closeModal} />
      <div className="stat-card stat-card--glow" onClick={openModal} >
        <p className="stat-card__label">{title}</p>
        <p id="statFiltered" className="stat-card__value text-amber">₹{value}</p>
      </div>
    </>

  )
}

export default AnalyticsCard