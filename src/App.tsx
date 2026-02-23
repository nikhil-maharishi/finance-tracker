import './App.css'
import { BudgetProvider, TransactionProvider } from './context/transactionContext'
import Landing from './pages/Landing'

function App() {
  return (
    <BudgetProvider>
      <TransactionProvider>
        <Landing/>
      </TransactionProvider>
      </BudgetProvider>
  )
}

export default App
