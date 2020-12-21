import React, { createContext, useReducer, useContext } from 'react'

const StoreContext = createContext()
const { Provider } = StoreContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_BUDGET':

      return {
        ...state,
        originArr: action.originArr,
        transactionArr: action.transactionArr,
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
