import React from 'react'

const Toaster = () => {
    return (
        <div id="toastEl" className="toast hidden" role="status" aria-live="polite">
            <span id="toastIcon" className="toast__icon" aria-hidden="true">✓</span>
            <span id="toastMsg" className="toast__msg">Action completed.</span>
            <button id="toastUndo" className="btn-undo hidden" type="button">UNDO</button>
            <button id="toastClose" className="btn-icon-close" type="button" aria-label="Dismiss notification">✕</button>
        </div>
    )
}

export default Toaster