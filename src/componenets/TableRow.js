import React from 'react'
import { format } from 'date-fns'

function TableRow ({ transactionArr, currentBalance, displayLineItem }) {
  return (
    <>
      {transactionArr.length ? transactionArr.map((item, index) => (
        <tr
          key={index}
          className='table_row'
          id={item._id}
          onClick={(e) => displayLineItem(e.target.parentElement.id)}
        >
          <th>{format(item.date, 'LL/dd')}</th>
          <td>{item.paidTo}</td>
          <td>{item.category}</td>
          <td>{item.withdrawlAmount}</td>
          <td>{item.depositAmount}</td>
          <td>{item.currentBalance}</td>

        </tr>
      )) : (<p>no records</p>)}
    </>
  )
}

export default TableRow
