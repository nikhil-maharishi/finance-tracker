import { useContext } from 'react'
import { BudgetContext } from '../context/transactionContext';

type InsightBarProps = {
    category: string;
    total: number;
}
const InsightBar = ({ category, total }: InsightBarProps) => {
        const { budget } = useContext(BudgetContext)!
    
    return (
        <div className="bar-row">
            <div className="bar-row__header">
                <span className="bar-row__name">{category}</span>
                <span className="bar-row__amount text-amber">
                    ₹{total.toFixed(2)}
                    <span className="bar-row__pct">{(total / budget * 100).toFixed(2)}%</span>
                </span>
            </div>
            <div className="progress-track">
                <div className={`progress-fill ${total > budget ? 'progress-fill--danger' : 'progress-fill--amber'}`} style={{ width: `${(total / budget) * 100}%` }}></div>
            </div>
        </div>
    )
}

export default InsightBar