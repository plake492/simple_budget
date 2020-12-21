import './App.css'
import Spending from './pages/Spending'
import Nav from './componenets/Nav'
import { StoreProvider } from './utils/GlobalState'

function App () {
  return (
    <div>
      <StoreProvider>
        <Nav />
        <Spending />
      </StoreProvider>
    </div>
  )
}

export default App
