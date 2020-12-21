import React, { useState } from 'react'
import { format } from 'date-fns'
import TableRow from './TableRow'

function SpendingTable ({
  transactionArr,
  setTransactionArr,
  setCurrentBalance,
  updateCurrentBalance
}) {
  const [showLineItem, setShowLineItem] = useState(false)
  const [lineItem, setLineitem] = useState('')

  const displayLineItem = (_id) => {
    const item = transactionArr.find(item => item._id === _id)
    setLineitem(item)
    setShowLineItem(true)
  }

  const removeItem = (_id) => {
    const newArr = transactionArr.filter(item => item._id !== _id)
    console.log('newArr==>>', newArr)
    setTransactionArr(newArr)
    setShowLineItem(false)
    updateCurrentBalance(newArr)
  }

  const clearAll = () => {
    const verify = prompt('if sure, type "yes"')
    if (verify.toLowerCase() === 'yes') {
      localStorage.clear('transactionArr')
      setTransactionArr([])
      setCurrentBalance(0)
    }
  }

  return (
    <div className='col-lg-6'>
      <div className='jumbotron'>
        {!showLineItem
          ? (
            <>
              <div className='d-flex justify-content-between'>
                <h1 className='text-center pt-2'>Balance Sheet</h1>
                <button style={{ height: '20px', backgroundColor: 'red' }} onClick={() => clearAll()}>CLEAR</button>
                {/* <p>Current Balence: {currentBalance}</p> */}
              </div>
              <table className='table text-center'>
                <thead>
                  <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Place</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Withdrawal</th>
                    <th scope='col'>Deposit</th>
                    <th scope='col'>Available</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow
                    transactionArr={transactionArr}
                    // currentBalance={currentBalance}
                    displayLineItem={displayLineItem}
                  />
                </tbody>
              </table>
            </>
          ) : (
            <div>
              <p>{format(lineItem.date, 'LL/dd')}</p>
              <p>{lineItem.paidTo}</p>
              <p>{lineItem.category}</p>
              <p>{lineItem.withdrawlAmount}</p>
              <p>{lineItem.depositAmount}</p>
              <p>{lineItem.currentBalance}</p>
              <button onClick={(e) => setShowLineItem(false)}>show all</button>
              <button onClick={(e) => removeItem(lineItem._id)}>Delete</button>
            </div>
          )}
      </div>
    </div>
  )
}

export default SpendingTable
