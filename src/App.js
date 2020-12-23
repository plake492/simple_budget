import './App.css'
import Spending from './pages/Spending/index'
import MonthBudget from './pages/MonthBudget/index'
import Nav from './componenets/Nav'
import { StoreProvider } from './utils/GlobalState'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App () {
  return (
    <Router>
      <StoreProvider>
        <Nav />
        <Switch>
          <Route exact path='/' component={Spending} />
          <Route exact path='/budget' component={MonthBudget} />
        </Switch>
      </StoreProvider>
    </Router>
  )
}

export default App
