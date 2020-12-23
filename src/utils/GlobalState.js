import React, { createContext, useReducer, useContext } from 'react'
import { format } from 'date-fns'

const StoreContext = createContext()
const { Provider } = StoreContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_BUDGET':
      return {
        ...state,
        originArr: action.transactions,
        transactionArr: action.transactions,
        currentBalance: action.currentBalance || 0
      }
    case 'UPDATE_BUDGET_INSTANCE':
      return {
        ...state,
        currentBalance: action.currentBalance,
        transactionArr: [...state.transactionArr, action.transaction],
        originArr: [...state.originArr, action.transaction]
      }
    case 'UPDATE_TRANSACTION_ARR':
      return {
        ...state,
        transactionArr: action.arr
      }
    case 'RESET_TRANSACTION_ARR':
      return {
        ...state,
        transactionArr: state.originArr
      }
    case 'UPDATE_CURRENT_BUDGET' :
      return {
        ...state,
        currentBalance: action.currentBalance
      }
    case 'UPDATE_FOCUS_MONTH' :
      return {
        ...state,
        focusMonth: action.focusMonth
      }
    case 'UPDATE_FOCUS_YEAR' :
      return {
        ...state,
        focusYear: action.year
      }
    default:
      return state
  }
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    originArr: [],
    transactionArr: [],
    currentBalance: 0,
    focusMonth: format(new Date(), 'LLLL'),
    focusYear: format(new Date(), 'uuuu')
  })

  return <Provider value={[state, dispatch]} {...props} />
}

const useStoreContext = () => {
  return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }
