import React, { useState, useEffect } from 'react'
import Withdrawl from '../../componenets/Withdrawl'
import Deposit from '../../componenets/Deposit'
import SpendingTable from '../../componenets/SpendingTable'
import { uuid } from 'uuidv4'
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/API'
import { updateTransactionsBalance } from '../../utils/helpers'

function Spending () {
  const [state, dispatch] = useStoreContext()

  const [catCurrentBalance, setCatCurrentBalance] = useState(0)
  const [transaction, setTransaction] = useState({})
  const [accountOptions] = useState([{ item: 'Checking', itemId: 1 }, { item: 'Savings', itemId: 2 }])
  const [cardOptions] = useState([{ item: '**** **** **** 0000', itemId: 1 }])
  const [catSearch, setCatSearch] = useState('')
  const [toggleType, setToggleType] = useState('') // use to togglw table from all items or single line item
  const [keyWordSearch, setKeyWordSearch] = useState('')
  const [catOptions] = useState([
    { item: 'All', itemId: 0 },
    { item: 'Grocery', itemId: 1 },
    { item: 'Food Out', itemId: 2 },
    { item: 'Extra', itemId: 3 },
    { item: 'Bill', itemId: 4 },
    { item: 'Debt', itemId: 5 },
    { item: 'Gas', itemId: 6 },
    { item: 'Health', itemId: 7 },
    { item: 'Undefined', itemId: 8 }
  ])

  // Grab local storage on componenet load
  // set initial state
  useEffect(() => {
    const { transactions, currentBalance } = API.getInitialBudget()
    dispatch({
      type: 'INITIALIZE_BUDGET',
      transactions: transactions,
      currentBalance: currentBalance
    })
  }, [])

  const handleChangeTransactions = (e, type) => {
    setToggleType(type)
    let { name, value } = e.target
    if (name.includes('Amount')) {
      value = parseFloat(value)
    }
    setTransaction({ ...transaction, type: type, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      (transaction.type === 'withdrawl' && Object.keys(transaction).length >= 4) ||
      (transaction.type === 'deposit' && Object.keys(transaction).length >= 2)
    ) {
      const balance = transaction.type === 'deposit' ? (state.currentBalance + transaction.depositAmount) : (state.currentBalance - transaction.withdrawlAmount)

      transaction.currentBalance = balance
      transaction._id = uuid()
      transaction.date = Date.now()

      API.postBudget({
        transactions: [...state.originArr, transaction],
        currentBalance: balance
      })

      dispatch({
        type: 'UPDATE_BUDGET_INSTANCE',
        currentBalance: balance,
        transaction: transaction
      })
    }
    setTransaction({})
    setToggleType('')
  }

  const updateCurrentBalance = (newArr) => {
    const updateTransactions = updateTransactionsBalance(newArr)
    const newBalance = updateTransactions[updateTransactions.length - 1].currentBalance

    API.postBudget({
      transactions: updateTransactions,
      currentBalance: newBalance
    })

    dispatch({
      type: 'INITIALIZE_BUDGET',
      transactions: updateTransactions,
      currentBalance: newBalance
    })

    const budgetInstance = API.getInitialBudget()
    budgetInstance.transactions = updateTransactions
    API.postBudget(budgetInstance)
  }

  const handleChangeSearch = e => {
    setCatSearch(e.target.value)
  }

  const searchByCat = (e) => {
    e.preventDefault()
    if (!catSearch || catSearch === ' -- select an option -- ') {
      return resetCat()
    }
    if (catSearch === 'All') {
      return resetCat()
    }
    dispatch({ type: 'RESET_TRANSACTION_ARR' })
    const filterdTransactions = state.originArr.filter(item => item.category === catSearch)
    const filterdBalance = filterdTransactions.reduce((acc, cur) => (acc += cur.withdrawlAmount), 0)
    setCatCurrentBalance(filterdBalance)
    dispatch({
      type: 'UPDATE_TRANSACTION_ARR',
      arr: filterdTransactions
    })
  }

  const resetCat = () => {
    setCatSearch('')
    dispatch({ type: 'RESET_TRANSACTION_ARR' })
  }

  const searchByKeyWord = (e, word) => {
    e.preventDefault()
    if (searchByKeyWord) {
      const searchRes = new Set()

      state.originArr.forEach(item => {
        const keys = Object.keys(item)
        keys.forEach(key => {
          if (typeof item[key] === 'string') {
            if (item[key].toLowerCase().includes(keyWordSearch.toLowerCase())) {
              searchRes.add(item)
            }
          }
          if (typeof item[key] === 'number') {
            if (item[key] === parseFloat(keyWordSearch)) {
              searchRes.add(item)
            }
          }
        })
      })
      dispatch({
        type: 'UPDATE_TRANSACTION_ARR',
        arr: [...searchRes]
      })
      setKeyWordSearch('')
    }
  }

  const handleChangeKeyword = (e) => setKeyWordSearch(e.target.value)

  return (
    <>
      <div className='container-fluid mt-5 row'>
        <div className='col-lg-4'>
          <div className='jumbotron'>
            <div className='row px-4'>
              <Withdrawl
                transaction={transaction}
                setTransaction={setTransaction}
                handleSubmit={handleSubmit}
                catOptions={catOptions}
                cardOptions={cardOptions}
                toggle={toggleType}
                setToggle={setToggleType}
                handleChange={handleChangeTransactions}
              />
              <Deposit
                transaction={transaction}
                setTransaction={setTransaction}
                handleSubmit={handleSubmit}
                accountOptions={accountOptions}
                toggle={toggleType}
                setToggle={setToggleType}
                handleChange={handleChangeTransactions}
              />
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='jumbotron' style={{ paddingTop: '2rem' }}>
            <SpendingTable
              searchByCat={searchByCat}
              catOptions={catOptions}
              resetCat={resetCat}
              handleChangeSearch={handleChangeSearch}
              updateCurrentBalance={updateCurrentBalance}
              catCurrentBalance={catCurrentBalance}
              searchByKeyWord={searchByKeyWord}
              handleChangeKeyword={handleChangeKeyword}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default Spending