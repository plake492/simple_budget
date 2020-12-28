import React, { useState } from 'react'
import TableRow from './TableRow'
import LineItem from './LineItem'
import SearchCategory from './SearchCategory'
import { useStoreContext } from '../utils/GlobalState'
import API from '../utils/API'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { getListStyle } from '../utils/styles'

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

  const onDragEnd = (item) => {
    if (!item.destination) {
      return
    }
    const startIndex = item.source.index
    const endIndex = item.destination.index
    const result = Array.from(state.orignBuget[state.targetDate])
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    updateCurrentBalance(result)
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
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                      <tbody
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <TableRow
                          transactionArr={state.transactionArr[state.targetDate] || null}
                          displayLineItem={displayLineItem}
                        />
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </DragDropContext>
              </table>
            </div>
          </>
        ) : (
          <LineItem
            lineItem={lineItem}
            setShowLineItem={setShowLineItem}
            removeItem={removeItem}
          />
        )}
    </>
  )
}

export default SpendingTable
