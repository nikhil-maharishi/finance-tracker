import React from 'react'
import InsightBar from './InsightBar'

const Insights = () => {
    return (
        <section id="panelInsights" className="space-y-4" role="tabpanel" aria-labelledby="tabInsights">
            <div className="breakdown-section">
                <h2 className="breakdown-section__title">Spending by Category</h2>
                <div id="categoryBars" className="space-y-4">
                    <InsightBar />
                </div>
            </div>

            {/* <!-- Insight summary cards */}
            <div className="insights-grid">
                <div className="insights-card">
                    <p className="insights-card__label">Top Category</p>
                    <p id="topCatIcon" className="insights-card__icon" aria-hidden="true">🍽️</p>
                    <p id="topCatName" className="insights-card__name">Food &amp; Dining</p>
                    <p id="topCatAmt" className="insights-card__value text-amber">₹340.00</p>
                </div>
                <div className="insights-card">
                    <p className="insights-card__label">Avg per Day</p>
                    <p id="insightAvgDay" className="insights-card__value text-info">—</p>
                    <p className="empty-state__text">based on date range</p>
                </div>
                <div className="insights-card">
                    <p className="insights-card__label">Entries Count</p>
                    <p id="insightCount" className="insights-card__value text-violet">—</p>
                    <p className="empty-state__text">in current filter</p>
                </div>
            </div>
        </section>
    )
}

export default Insights