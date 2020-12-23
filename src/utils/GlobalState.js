import React, { createContext, useReducer, useContext } from 'react'

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
    default:
      return state
  }
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    originArr: [],
    transactionArr: [],
    currentBalance: 0
  })

  return <Provider value={[state, dispatch]} {...props} />
}

const useStoreContext = () => {
  return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }
