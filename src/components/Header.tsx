import { useState } from "react"
import AddTransactionModal from "./AddTransactionModal"


const Header = () => {
    const [showAddTransactionModal, setshowAddTransactionModal] = useState<boolean>(false)

    const openModal = (): void => {
        setshowAddTransactionModal(true);
    };

    const closeModal = (): void => {
        setshowAddTransactionModal(false);
    };
    return (
        <>
            <AddTransactionModal showModal={showAddTransactionModal} setShowModal={closeModal} />
            <header className="site-header glass" role="banner">

                {/* <!-- Brand --> */}
                <div>
                    <h1 className="site-header__brand-name">Ledger</h1>
                    <p className="site-header__brand-sub">Finance Tracker</p>
                </div>

                {/* <!-- Header actions --> */}
                <div className="site-header__actions">
                    <button className="btn btn-ghost" id="btnExport" type="button" aria-label="Export expenses as CSV">
                        {/* <!-- Download icon --> */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Export CSV
                    </button>

                    <button className="btn btn-primary" id="btnAddExpense" type="button" onClick={openModal} >
                        {/* <!-- Plus icon --> */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Expense
                    </button>
                </div>

            </header>
        </>

    )
}

export default Header