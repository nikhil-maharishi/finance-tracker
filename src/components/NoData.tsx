

const NoData = () => {
    return (
        <div id="emptyState" className="empty-state" role="status">
            <p className="empty-state__icon" aria-hidden="true">₹</p>
            <p className="empty-state__text">No expenses found. Add your first entry.</p>
        </div>
    )
}

export default NoData