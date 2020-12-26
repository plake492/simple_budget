import React, { useState } from 'react'
import { format } from 'date-fns'
import TableRow from './TableRow'
import SearchCategory from './SearchCategory'
import { useStoreContext } from '../utils/GlobalState'
import API from '../utils/API'

function SpendingTable ({
  updateCurrentBalance,
  searchByCat,
  catOptions,
  resetCat,
  setSearchByCat,
  handleChangeSearch,
  catCurrentBalance,
  searchByKeyWord,
  handleChangeKeyword
}) {
  const [state, dispatch] = useStoreContext()

  const [showLineItem, setShowLineItem] = useState(false)
  const [lineItem, setLineitem] = useState('')

  const displayLineItem = (_id) => {
    const item = state.transactionArr[state.targetDate].find(item => item._id === _id)
    setLineitem(item)
    setShowLineItem(true)
  }

  const removeItem = (_id) => {
    const newArr = state.transactionArr[state.targetDate].filter(item => item._id !== _id)
    setShowLineItem(false)
    updateCurrentBalance(newArr)
  }

  const clearAll = () => {
    const verify = prompt('if sure, type "yes"')
    API.deleteAll()
    if (verify === null) {
      return
    }
    if (verify.toLowerCase() === 'yes') {
      return dispatch({
        type: 'INITIALIZE_BUDGET',
        transactions: [],
        currentBalance: 0
      })
    }
  }

  return (
    <>
      {!showLineItem
        ? (
          <>
            <div className='p-2 border mb-4'>
              <SearchCategory
                setSearchByCat={setSearchByCat}
                searchByCat={searchByCat}
                catOptions={catOptions}
                handleChangeSearch={handleChangeSearch}
                resetCat={resetCat}
                searchByKeyWord={searchByKeyWord}
                handleChangeKeyword={handleChangeKeyword}
                hasArr={state.orignBuget[state.targetDate]}
              />
            </div>
            <div className='jumbotron' style={{ paddingTop: '2rem' }}>
              <div className='d-flex justify-content-between'>
                <h1 className='text-center pt-2'>Balance Sheet</h1>
                <button style={{ height: '20px', backgroundColor: 'red' }} onClick={() => clearAll()}>CLEAR</button>
                <p>Current Balence: {catCurrentBalance}</p>
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
                    transactionArr={state.transactionArr[state.targetDate] || null}
                    displayLineItem={displayLineItem}
                  />
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>
            <p>{format(lineItem.date, 'LL/dd')}</p>
            <p>Paid to: {lineItem.paidTo}</p>
            <p>Item Category: {lineItem.category}</p>
            <p>transaction amount: {lineItem.withdrawlAmount}</p>
            <p>transaction amount: {lineItem.depositAmount}</p>
            <p>Current Balance at transaction: {lineItem.currentBalance}</p>
            <p>notes: {lineItem.notes || 'No Notes'}</p>
            <div className='d-flex flex-row justify-content-between'>
              <button className='btn btn-secondary mr-2' onClick={(e) => setShowLineItem(false)}>show all</button>
              <button className='btn btn-primary' onClick={(e) => removeItem(lineItem._id)}>Delete</button>
            </div>
          </div>
        )}
    </>
  )
}

export default SpendingTable
