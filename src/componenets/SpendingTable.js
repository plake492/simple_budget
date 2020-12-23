import React, { useState } from 'react'
import { format, toDate } from 'date-fns'
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
  const underline = {
    borderBottom: 'black 1px solid',
    color: 'hsl(225, 2, 80)'
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [state, dispatch] = useStoreContext()

  const [showLineItem, setShowLineItem] = useState(false)
  const [lineItem, setLineitem] = useState('')

  const displayLineItem = (_id) => {
    const item = state.transactionArr.find(item => item._id === _id)
    setLineitem(item)
    setShowLineItem(true)
  }

  const removeItem = (_id) => {
    const newArr = state.transactionArr.filter(item => item._id !== _id)
    setShowLineItem(false)
    updateCurrentBalance(newArr)
  }

  const clearAll = () => {
    const verify = prompt('if sure, type "yes"')
    API.deleteAll()
    if (verify.toLowerCase() === 'yes') {
      dispatch({
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
              />
            </div>
            <div className='jumbotron' style={{ paddingTop: '2rem' }}>
              <div className='d-flex flex-row justify-content-end'>
                <div className='flex-fill month_select d-flex justify-content-between px-4 pt-3 rounded mb-4' style={{ backgroundColor: '#DEDEE0' }}>
                  {months.map((month, index) => (
                    <p
                      style={state.focusMonth === month ? underline : null}
                      key={index}
                      onClick={() => dispatch({ type: 'UPDATE_FOCUS_MONTH', month: month })}
                    >{month}
                    </p>
                  ))}
                </div>
                <div>
                  <select
                    className='form-control ml-2'
                    onChange={(e) => dispatch({ type: 'UPDATE_FOCUS_YEAR', year: e.target.value })}
                  >
                    <option value=''>Year</option><option value='2018'>2018</option><option value='2019'>2019</option><option value='2020'>2020</option><option value='2021'>2021</option><option value='2022'>2022</option>
                  </select>
                </div>
              </div>
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
                    transactionArr={state.transactionArr}
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
