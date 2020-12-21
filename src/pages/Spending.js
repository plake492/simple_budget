import React, { useState, useEffect } from 'react'
import Withdrawl from '../componenets/Withdrawl'
import Deposit from '../componenets/Deposit'
import SpendingTable from '../componenets/SpendingTable'
import { uuid } from 'uuidv4'

function Spending () {
  const [currentBalance, setCurrentBalance] = useState(0)
  const [transaction, setTransaction] = useState({})
  const [transactionArr, setTransactionArr] = useState([])
  const [accountOptions] = useState([{ item: 'Checking', itemId: 1 }, { item: 'Savings', itemId: 2 }])
  const [cardOptions] = useState([{ item: '**** **** **** 0000', itemId: 1 }])
  const [toggleType, setToggleType] = useState('')
  const [catOptions] = useState([
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
    const stored = JSON.parse(localStorage.getItem('transactionArr')) || []
    console.log('stored==>>', stored)
    setTransactionArr(stored)
  }, [])

  const handleChange = (e, type) => {
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
      (transaction.type === 'withdrawl' && Object.keys(transaction).length === 5) ||
      (transaction.type === 'deposit' && Object.keys(transaction).length === 3)
    ) {
      const balance = transaction.type === 'deposit' ? (currentBalance + transaction.depositAmount) : (currentBalance - transaction.withdrawlAmount)
      setCurrentBalance(balance)
      transaction.currentBalance = balance
      transaction._id = uuid()
      transaction.date = Date.now()
      localStorage.setItem('transactionArr', JSON.stringify([...transactionArr, transaction]))
      setTransactionArr([...transactionArr, transaction])
    }
    setTransaction({})
    setToggleType('')
  }

  const updateCurrentBalance = (newArr) => {
    const updateTransactions = newArr.map((item, i) => {
      if (i === 0) {
        if ('withdrawlAmount' in item) { item.currentBalance = item.withdrawlAmount }
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
    localStorage.setItem('transactionArr', JSON.stringify(updateTransactions))
  }

  return (
    <>
      <div className='container-fluid mt-5 row'>
        <div className='col-lg-6'>
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
                handleChange={handleChange}
              />
              <Deposit
                transaction={transaction}
                setTransaction={setTransaction}
                handleSubmit={handleSubmit}
                accountOptions={accountOptions}
                toggle={toggleType}
                setToggle={setToggleType}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <SpendingTable
          transactionArr={transactionArr}
          setTransactionArr={setTransactionArr}
          setCurrentBalance={setCurrentBalance}
          updateCurrentBalance={updateCurrentBalance}
        />
      </div>
    </>
  )
}

export default Spending
