import React from 'react'
import { format } from 'date-fns'
import { useStoreContext } from '../utils/GlobalState'

function TableRow ({
  // transactionArr,
  currentBalance,
  displayLineItem
}) {
  const [state] = useStoreContext()
  console.log('state==>>', state)
  return (
    <>
      {state.transactionArr.length ? state.transactionArr.map((item, index) => {
        console.log('item, index==>>', item, index)
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
            <td>{item.withdrawlAmount}</td>
            <td>{item.depositAmount}</td>
            <td>{item.currentBalance}</td>

          </tr>
        )
      }) : (<p>no records</p>)}
    </>
  )
}

export default TableRow
