import './App.css'
import { TransactionProvider } from './context/transactionContext'
import Landing from './pages/Landing'

function App() {
  return (
      <TransactionProvider>
        <Landing/>
      </TransactionProvider>
  )
}

export default App
