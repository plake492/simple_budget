import React, { useState, useEffect } from 'react'
import Withdrawl from '../componenets/Withdrawl'
import Deposit from '../componenets/Deposit'
import SpendingTable from '../componenets/SpendingTable'
import { uuid } from 'uuidv4'
import { useStoreContext } from '../utils/GlobalState'
import API from '../utils/API'

function Spending () {
  const [state, dispatch] = useStoreContext()

  const [currentBalance, setCurrentBalance] = useState(0)
  const [catCurrentBalance, setCatCurrentBalance] = useState(0)
  const [transaction, setTransaction] = useState({})
  const [transactionArr, setTransactionArr] = useState([]) // display all or current caregory
  const [originArr, setOriginArr] = useState([]) // keep track of all transactions

  const [accountOptions] = useState([{ item: 'Checking', itemId: 1 }, { item: 'Savings', itemId: 2 }])
  const [cardOptions] = useState([{ item: '**** **** **** 0000', itemId: 1 }])

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

  const [catSearch, setCatSearch] = useState('')
  const [toggleType, setToggleType] = useState('') // use to togglw table from all items or single line item

  const [keyWordSearch, setKeyWordSearch] = useState('')
  // Grab local storage on componenet load
  // set initial state
  useEffect(() => {
    const { transactions, balance } = API.getInitialBudget()

    setCurrentBalance(balance)
    setOriginArr(transactions)
    setTransactionArr(transactions)

    // dispatch({
    //   type: 'INITIALIZE_BUDGET',
    //   originArr: transactions,
    //   transactionArr: transactions,
    //   currentBalance: balance
    // })
    console.log('state==>>', state)
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
      const balance = transaction.type === 'deposit' ? (currentBalance + transaction.depositAmount) : (currentBalance - transaction.withdrawlAmount)
      setCurrentBalance(balance)
      transaction.currentBalance = balance
      transaction._id = uuid()
      transaction.date = Date.now()
      const currentBudgetInstance = {
        transactions: [...originArr, transaction],
        balance: balance
      }
      localStorage.setItem('budget', JSON.stringify(currentBudgetInstance))
      setTransactionArr([...transactionArr, transaction])
      setOriginArr([...originArr, transaction])
    }
    setTransaction({})
    setToggleType('')
  }

  const updateCurrentBalance = (newArr) => {
    const updateTransactions = newArr.map((item, i) => {
      if (i === 0) {
        if ('withdrawlAmount' in item) { item.currentBalance = -item.withdrawlAmount }
        if ('depositAmount' in item) { item.currentBalance = item.depositAmount }
      }
      if (i > 0) {
        if ('withdrawlAmount' in item) {
          item.currentBalance = newArr[i - 1].currentBalance - item.withdrawlAmount
        }
        if ('depositAmount' in item) {
          item.currentBalance = newArr[i - 1].currentBalance + item.depositAmount
        }
      }
      return item
    })
    setCurrentBalance(updateTransactions[updateTransactions.length - 1].currentBalance)
    setTransactionArr(updateTransactions)
    setOriginArr(updateTransactions)
    const budgetInstance = JSON.parse(localStorage.getItem('budget'))
    budgetInstance.transactions = updateTransactions
    localStorage.setItem('budget', JSON.stringify(budgetInstance))
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
    setTransactionArr(originArr)
    const filterdTransactions = originArr.filter(item => item.category === catSearch)
    const filterdBalance = filterdTransactions.reduce((acc, cur) => (acc += cur.withdrawlAmount), 0)
    setCatCurrentBalance(filterdBalance)
    setTransactionArr(filterdTransactions)
  }

  const resetCat = () => {
    setCatSearch('')
    setTransactionArr(originArr)
  }

  const searchByKeyWord = (e, word) => {
    e.preventDefault()
    if (searchByKeyWord) {
      const searchRes = new Set()

      originArr.forEach(item => {
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
      console.log('searchRes==>>', searchRes)
      setTransactionArr([...searchRes])
      setKeyWordSearch('')
    }
  }

  const handleChangeKeyword = (e) => {
    setKeyWordSearch(e.target.value)
    //! do I want search to update on change
    // searchByKeyWord(e)
  }

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
              transactionArr={transactionArr}
              setTransactionArr={setTransactionArr}
              setCurrentBalance={setCurrentBalance}
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
