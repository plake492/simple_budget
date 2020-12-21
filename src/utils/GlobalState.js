import React, { createContext, useReducer, useContext } from 'react'

const StoreContext = createContext()
const { Provider } = StoreContext

const reducer = (state, action) => {
  console.log('state, action==>>', state, action)
  switch (action.type) {
    case 'NEW_TRANSACTION':
      return {
        ...state,
        transaction: action.transaction
      }
    case 'SUBMIT_TRANSACTION':

      return {
        ...state,
        transactionArr: [...action.transactionArr, state.transaction]
      }
    default:
      return state
  }
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    transaction: {},
    transactionArr: []
  })

  return <Provider value={[state, dispatch]} {...props} />
}

const useStoreContext = () => {
  return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }
