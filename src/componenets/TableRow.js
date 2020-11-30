import React from 'react'

function TableRow ({ transactionArr }) {
  return (
    <>
      {transactionArr.map((item, index) => (
        <tr key={index} className='table_row'>
          <th>12/12/20</th>
          <td>{item.paidTo}</td>
          <td>{item.category}</td>
          <td>{item.withdrawlAmount}</td>
          <td>{item.depositAmount}</td>
          <td>4300</td>
        </tr>
      ))}
    </>
  )
}

export default TableRow
