import React, { useContext, useMemo, useState } from 'react'
import Insights from '../components/Insights'
import Expense, { type duration } from '../components/Expense'
import Header from '../components/Header'
import AnalyticsCard from '../components/AnalyticsCard'
import { categories } from '../utils/data'
import type { Category } from '../utils/interface'
import { BudgetContext, TransactionContext } from '../context/transactionContext'

type tab = 'Expense'|'Insight'

const Landing = () => {
    const { budget } = useContext(BudgetContext)!
    const { state } = useContext(TransactionContext)!;
    const [category, setCategory] = useState('')
    const [duration, setDuration] = useState<duration>('')
    const [tab, setTab] = useState<tab>('Expense')



    const getTotalExpense = useMemo(() => {
        return state.reduce((sum, ele) => sum + Number(ele.amount), 0)

    }, [state])

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
    }, [state]);

    const calculateBudgetUsage = useMemo(() => {
        if (budget === 0) return 0;
        return ((getTotalExpense / budget) * 100).toFixed(2);
    }, [getTotalExpense, budget]);


    return (
        <>
            <div className="bg-glow" aria-hidden="true"></div>
            <Header />
            <main className="page-wrapper space-y-7" role="main">
                <div id="budgetAlert" className={`budget-alert ${Number(calculateBudgetUsage) < 70 ? 'hidden' : ''}`} role="alert" aria-live="polite">
                    <div className="budget-alert__header">
                        <span className="budget-alert__badge">⚠ Budget Alert</span>
                        <span id="budgetAlertText" className="budget-alert__amount">₹{getTotalExpense} / ₹{budget} ({getTotalExpense > 0 ? calculateBudgetUsage : 0}%)</span>
                    </div>
                    <div className="progress-track">
                        <div id="budgetAlertFill" className="progress-fill progress-fill--danger" style={{ width: `${calculateBudgetUsage}%` }}></div>
                    </div>
                </div>
                <div className="stat-grid">
                    <AnalyticsCard title='TOTAL' value={getTotalExpense?.toString()} />
                    <AnalyticsCard title='THIS MONTH' value={getCurrentMonthExpense.toString()} />
                    <AnalyticsCard title='AVG / DAY' value={getAvgDayExpense.toString()} />
                    <AnalyticsCard title='BUDGET LIMIT' value={budget.toString()} modalType='budget' />
                </div>
                <div className="tabs" role="tablist">
                    <button className={`tab ${tab == 'Expense' ? `tab--active` : ''}`} onClick={() => setTab('Expense')}>
                        Expenses
                    </button>
                    <button className={`tab ${tab == 'Insight' ? `tab--active` : ''}`} id="tabInsights"
                        onClick={() => setTab('Insight')}>
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
                            <button className={`chip ${duration == '' ? `chip--active` : ''}`} type="button" onClick={() => setDuration('')}>All Time</button>
                            <button className={`chip ${duration == 'month' ? `chip--active` : ''}`} type="button" onClick={() => setDuration('month')}>This Month</button>
                            <button className={`chip ${duration == 'week' ? `chip--active` : ''}`} type="button" onClick={() => setDuration('week')}>This Week</button>
                        </div>
                        {/* <div className="filter-row__sort">
                            <button className="btn btn-ghost" type="button">
                                <span id="sortLabel">Date ↓ Newest</span>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="17 1 21 5 17 9" />
                                    <path d="M3 11V9a4 4 0 014-4h14" />
                                    <polyline points="7 23 3 19 7 15" />
                                    <path d="M21 13v2a4 4 0 01-4 4H3" />
                                </svg>
                            </button>
                        </div> */}
                    </div>
                </div>
                    {
                
                        tab == 'Expense' ? <Expense category={category} duration={duration} /> :<Insights />
                    }
                
            </main>

        </>
    )
}

export default Landing