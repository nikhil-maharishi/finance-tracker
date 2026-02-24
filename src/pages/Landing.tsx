import React, { useContext, useMemo, useState } from 'react'
import Insights from '../components/Insights'
import Expense from '../components/Expense'
import Header from '../components/Header'
import AnalyticsCard from '../components/AnalyticsCard'
import { categories } from '../utils/data'
import type { Category } from '../utils/interface'
import { BudgetContext, TransactionContext } from '../context/transactionContext'

const Landing = () => {
    const { budget } = useContext(BudgetContext)!
    const { state } = useContext(TransactionContext)!;
    const [category, setCategory] = useState('')

    const getTotalExpense = useMemo(() => {
        return state.reduce((sum, ele) => sum + Number(ele.amount), 0)

    },[state])

    const getCurrentMonthExpense = useMemo(() => {
        const currentMonth = new Date().getMonth() + 1;

        return state.reduce((sum, ele) => {
            const expenseMonth = ele.date.split("-")[1];

            const formattedMonth =
                currentMonth <= 9 ? "0" + currentMonth : String(currentMonth);

            if (expenseMonth === formattedMonth) {
                return sum + Number(ele.amount);
            }

            return sum;
        }, 0);
    }, [state]);

    const getAvgDayExpense = useMemo(() => {
        if (!state.length) return 0;

        const totalExpense = getTotalExpense
        const uniqueDays = new Set(
            state.map((expense) => expense.date)
        );

        const numberOfDays = uniqueDays.size;

        return (totalExpense / numberOfDays).toFixed(2);
    },[state]);


    return (
        <>
            <div className="bg-glow" aria-hidden="true"></div>
            <Header />
            <main className="page-wrapper space-y-7" role="main">
                <div className="stat-grid">
                    <AnalyticsCard title='TOTAL' value={getTotalExpense?.toString()} />
                    <AnalyticsCard title='THIS MONTH' value={getCurrentMonthExpense.toString()} />
                    <AnalyticsCard title='AVG / DAY' value={getAvgDayExpense.toString()} />
                    <AnalyticsCard title='BUDGET LIMIT' value={budget.toString()} modalType='budget' />
                </div>
                <div className="tabs" role="tablist">
                    <button className="tab tab--active">
                        Expenses
                    </button>
                    <button className="tab" id="tabInsights">
                        Insights
                    </button>
                </div>

                <div className="space-y-4">

                    {/* <!-- Category filter --> */}
                    <div id="catChips" className="chips-row" role="group">
                        <button className={`chip ${category == '' ? `chip--active` : ''}`} type="button" onClick={() => setCategory('')}>All Categories</button>
                        {categories.map((cat: Category) => (
                            <button key={cat.id} className={`chip ${category == cat?.label ? `chip--active` : ''}`} type="button" onClick={() => setCategory(cat?.label)}>
                                {cat?.icon} {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* <!-- Date range + sort --> */}
                    <div className="filter-row">
                        <div id="rangeChips" className="chips-row">
                            <button className="chip chip--active" type="button">All Time</button>
                            <button className="chip" type="button">This Month</button>
                            <button className="chip" type="button">This Week</button>
                        </div>
                        <div className="filter-row__sort">
                            <button className="btn btn-ghost" type="button">
                                <span id="sortLabel">Date ↓ Newest</span>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="17 1 21 5 17 9" />
                                    <path d="M3 11V9a4 4 0 014-4h14" />
                                    <polyline points="7 23 3 19 7 15" />
                                    <path d="M21 13v2a4 4 0 01-4 4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <Expense category={category} />
                <Insights />
            </main>

        </>
    )
}

export default Landing