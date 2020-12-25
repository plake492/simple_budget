import React, { createContext, useReducer, useContext } from 'react'
import { format } from 'date-fns'

const StoreContext = createContext()
const { Provider } = StoreContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_BUDGET':
      return {
        ...state,
        orignBuget: { ...action.transactions },
        transactionArr: { ...action.transactions },
        currentBalance: action.currentBalance || 0
      }
    case 'UPDATE_BUDGET_INSTANCE':
      return {
        ...state,
        targetDate: action.targetDate,
        currentBalance: action.currentBalance,
        transactionArr: { ...action.transactions },
        orignBuget: { ...action.transactions }
      }
    case 'UPDATE_TRANSACTION_ARR':
      console.log('action==>>', action)
      return {
        ...state,
        transactionArr: { [action.targetDate]: [...action.arr] }
      }
    case 'RESET_TRANSACTION_ARR':
      return {
        ...state,
        transactionArr: state.orignBuget
      }
    case 'UPDATE_CURRENT_BUDGET' :
      return {
        ...state,
        currentBalance: action.currentBalance
      }
    case 'UPDATE_FOCUS_DATE' :
      return {
        ...state,
        targetDate: action.date
      }
    case 'UPDATE_FOCUS_MONTH' :
      return {
        ...state,
        focusMonth: action.month
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
    orignBuget: {},
    transactionArr: {},
    currentBalance: 0,
    focusMonth: format(new Date(), 'LLLL'),
    focusYear: format(new Date(), 'uuuu'),
    targetDate: format(new Date(), 'LLLL') + '_' + format(new Date(), 'uuuu')
  })

  return <Provider value={[state, dispatch]} {...props} />
}

const useStoreContext = () => {
  return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }
