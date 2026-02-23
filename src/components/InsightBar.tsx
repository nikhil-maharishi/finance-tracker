import React from 'react'

const InsightBar = () => {
    return (
        <div className="bar-row">
            <div className="bar-row__header">
                <span className="bar-row__name">🍽️ Food &amp; Dining</span>
                <span className="bar-row__amount text-amber">
                    ₹340.00
                    <span className="bar-row__pct">100%</span>
                </span>
            </div>
            <div className="progress-track">
                <div className="progress-fill"></div>
            </div>
        </div>
    )
}

export default InsightBar