import React from 'react'
import { format } from 'date-fns'

function LineItem ({ lineItem, setShowLineItem, removeItem }) {
  return (
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
  )
}

export default LineItem
