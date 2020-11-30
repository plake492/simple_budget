import React, { useState } from 'react'
import Withdrawl from '../componenets/Withdrawl'
import Deposit from '../componenets/Deposit'
import SpendingTable from '../componenets/SpendingTable'

function Spending () {
  const [transaction, setTransaction] = useState({})
  const [transactionArr, setTransactionArr] = useState([])
  const [accountOptions, setAccountOptions] = useState([{ item: 'Checking', itemId: 1 }, { item: 'Savings', itemId: 2 }])
  const [cardOptions, setCardOptions] = useState([{ item: '**** **** **** 0000', itemId: 1 }])
  const [catOptions, setCatOptions] = useState([
    { item: 'Grocery', itemId: 1 },
    { item: 'Food Out', itemId: 2 },
    { item: 'Extra', itemId: 3 },
    { item: 'Bill', itemId: 4 },
    { item: 'Debt', itemId: 5 },
    { item: 'Gas', itemId: 6 },
    { item: 'Health', itemId: 7 },
    { item: 'Undefined', itemId: 8 }
  ])

  const handleSubmit = () => {
    setTransactionArr([...transactionArr, transaction])
    setTransaction({})
  }

  return (
    <>
      <div className='container-fluid mt-5 row'>
        <div className='col-md-6'>
          <div className='jumbotron'>
            <div className='row px-4'>
              <Withdrawl
                transaction={transaction}
                setTransaction={setTransaction}
                handleSubmit={handleSubmit}
                catOptions={catOptions}
                cardOptions={cardOptions}
              />
              <Deposit
                transaction={transaction}
                setTransaction={setTransaction}
                handleSubmit={handleSubmit}
                accountOptions={accountOptions}
              />
            </div>
          </div>
        </div>
        <SpendingTable transactionArr={transactionArr} />
      </div>
    </>
  )
}

export default Spending
