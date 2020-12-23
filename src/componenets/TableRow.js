import React from 'react'
import { format } from 'date-fns'
import { add$ } from '../utils/helpers'
function TableRow ({
  transactionArr,
  currentBalance,
  displayLineItem
}) {
  return (
    <>
      {transactionArr.length ? transactionArr.map((item, index) => {
        add$(item) // Add $ to any number
        return (
          <tr
            style={{ padding: '1rem' }}
            key={index}
            className='table_row'
            id={item._id}
            onClick={(e) => displayLineItem(e.target.parentElement.id)}
          >
            <th>{format(item.date, 'LL/dd')}</th>
            <td>{item.paidTo}</td>
            <td>{item.category}</td>
            <td>{item.withdrawlAmount$}</td>
            <td>{item.depositAmount$}</td>
            <td>{item.currentBalance$}</td>
          </tr>
        )
      }) : (<tr><td>no records</td></tr>)}
    </>
  )
}

export default TableRow
