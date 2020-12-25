import React, { useState, useEffect } from 'react'
import Withdrawl from '../../componenets/Withdrawl'
import Deposit from '../../componenets/Deposit'
import SpendingTable from '../../componenets/SpendingTable'

import { uuid } from 'uuidv4'
import { useStoreContext } from '../../utils/GlobalState'
import { updateTransactionsBalance } from '../../utils/helpers'
import API from '../../utils/API'
import './style.css'

function Spending () {
  const [state, dispatch] = useStoreContext()

  const underline = {
    borderBottom: 'black 1px solid',
    fontWeight: '700'
  }

  const [catCurrentBalance, setCatCurrentBalance] = useState(0)
  const [transaction, setTransaction] = useState({})
  const [accountOptions] = useState([{ item: 'Checking', itemId: 1 }, { item: 'Savings', itemId: 2 }])
  const [cardOptions] = useState([{ item: '**** **** **** 0000', itemId: 1 }])
  const [catSearch, setCatSearch] = useState('')
  const [toggleType, setToggleType] = useState('') // use to togglw table from all items or single line item
  const [keyWordSearch, setKeyWordSearch] = useState('')
  const [display, setDisplay] = useState(state.orignBuget.length ? 'withdrawl' : 'deposit')
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

  useEffect(() => {
    const { transactions, currentBalance } = API.getInitialBudget()
    dispatch({
      type: 'INITIALIZE_BUDGET',
      transactions: transactions,
      currentBalance: currentBalance,
      targetDate: state.focusMonth + '_' + state.focusYear
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
      transaction.date = transaction.date || Date.now()

      const targetDate = state.targetDate

      const { transactions, currentBalance } = constructBudgetObj(transaction, balance, targetDate)

      API.postBudget({ transactions, currentBalance })

      dispatch({
        type: 'UPDATE_BUDGET_INSTANCE',
        targetDate: targetDate,
        transactions: transactions,
        currentBalance: currentBalance
      })
    }
    setTransaction({})
    setToggleType('')
  }

  const updateCurrentBalance = (newArr) => {
    let updateTransactions
    let newBalance
    if (newArr.length) { // Account for only one transaction present on deletion
      updateTransactions = updateTransactionsBalance(newArr) // From Helper Functions
      newBalance = updateTransactions[updateTransactions.length - 1].currentBalance
    } else {
      updateTransactions = []
      newBalance = 0
    }

    const transactions = {
      ...state.transactionArr,
      [state.targetDate]: [...updateTransactions]
    }

    API.postBudget({
      currentBalance: newBalance,
      transactions
    })

    dispatch({
      type: 'INITIALIZE_BUDGET',
      transactions: transactions,
      currentBalance: newBalance,
      targetDate: state.targetDate
    })
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
    const filterdTransactions = state.orignBuget[state.targetDate].filter(item => item.category === catSearch)
    const filterdBalance = filterdTransactions.reduce((acc, cur) => (acc += cur.withdrawlAmount), 0)
    setCatCurrentBalance(filterdBalance)
    dispatch({
      type: 'UPDATE_TRANSACTION_ARR',
      arr: filterdTransactions,
      targetDate: state.targetDate
    })
  }

  const resetCat = () => {
    setCatSearch('')
    dispatch({ type: 'RESET_TRANSACTION_ARR' })
    setCatCurrentBalance(0)
  }

  const searchByKeyWord = (e, word) => {
    e.preventDefault()
    if (searchByKeyWord) {
      const searchRes = new Set()

      state.orignBuget[state.targetDate].forEach(item => {
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
        arr: [...searchRes],
        targetDate: state.targetDate
      })
      setKeyWordSearch('')
    }
  }

  const handleChangeKeyword = (e) => setKeyWordSearch(e.target.value)

  const constructBudgetObj = (transaction, balance, targetDate = state.targetDate) => {
    return {
      transactions: {
        ...state.transactionArr,
        [targetDate]: state.transactionArr[targetDate]
          ? [...state.transactionArr[targetDate], transaction]
          : [transaction]
      },
      currentBalance: balance
    }
  }

  return (
    <>
      <div className='container-fluid mt-5 row'>
        <div className='col-lg-3'>
          <div className='jumbotron'>
            <div className='row px-4'>
              <div className='w-100 d-flex justify-content-between px-4 mt-n4 pt-3 rounded mb-3' style={{ backgroundColor: '#C5C5C7' }}>
                <p className='transaction_btn' style={display === 'withdrawl' ? underline : null} onClick={() => setDisplay('withdrawl')}>Withdrawl</p>
                <p className='transaction_btn' style={display === 'deposit' ? underline : null} onClick={() => setDisplay('deposit')}>Deposit</p>
              </div>
              {display === 'withdrawl' ? (
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
              ) : (
                <Deposit
                  transaction={transaction}
                  setTransaction={setTransaction}
                  handleSubmit={handleSubmit}
                  accountOptions={accountOptions}
                  toggle={toggleType}
                  setToggle={setToggleType}
                  handleChange={handleChangeTransactions}
                />
              )}
            </div>
          </div>
        </div>
        <div className='col-lg-9'>
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
    </>
  )
}

export default Spending
