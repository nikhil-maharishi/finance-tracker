import React, { useContext, useMemo } from 'react'
import InsightBar from './InsightBar'
import { TransactionContext } from '../context/transactionContext';
import { date } from 'yup';

const Insights = () => {
    const { state } = useContext(TransactionContext)!;

    const getExpenseByCategory = () => {
        const categoryTotals: { [key: string]: number } = {};

        state.forEach((expense) => {
            const category = expense.category;
            categoryTotals[category] = (categoryTotals[category] || 0) + Number(expense.amount);
        });

        return categoryTotals;
    };

    const categoryTotals = getExpenseByCategory();

    const getTopCategory = () => {
        let topCategory = '';
        let maxTotal = 0;   

        Object.entries(categoryTotals).forEach(([category, total]) => {
            if (total > maxTotal) {
                maxTotal = total;
                topCategory = category;
            }
        });

        return { category: topCategory, total: maxTotal };
    };

    const topCategory = getTopCategory();

    const topSpending = useMemo(() => {
        if (!state.length) return { category: '--', amount: 0, date: '',description:'' };
        let topSpending = state[0];

        state.forEach((expense) => {
            console.log(topSpending,expense,expense.amount > topSpending.amount);
            
            if (Number(expense.amount) > Number(topSpending.amount)) {
                topSpending = expense;
            }
        });

        return topSpending;
    }, [state]);

    return (
        <section id="panelInsights" className="space-y-4" role="tabpanel" aria-labelledby="tabInsights">
            <div className="breakdown-section">
                <h2 className="breakdown-section__title">Spending by Category</h2>
                <div id="categoryBars" className="space-y-4">
                    {Object.entries(categoryTotals).map(([category, total]) => (
                        <InsightBar key={category} category={category} total={total} />
                    ))}
                </div>
            </div>

            {/* <!-- Insight summary cards */}
            <div className="insights-grid">
                <div className="insights-card">
                    <p className="insights-card__label">Top Category</p>
                    {/* <p id="topCatIcon" className="insights-card__icon" aria-hidden="true">🍽️</p> */}
                    <p id="topCatName" className="insights-card__name">{topCategory.category}</p>
                    <p id="topCatAmt" className="insights-card__value text-amber">₹{topCategory.total.toFixed(2)}</p>
                </div>
                <div className="insights-card">
                    <p className="insights-card__label">Top Spending</p>
                    <p id="insightAvgDay" className="insights-card__value text-info">{topSpending.description} - ₹{topSpending.amount}</p>
                    {/* <p className="empty-state__text">{topSpending.description}</p> */}
                    <p className="empty-state__text">{topSpending.date}</p>
                </div>
            </div>
        </section>
    )
}

export default Insights