import React from 'react'
import TableRow from './TableRow'

function SpendingTable ({ transactionArr }) {
  return (
    <div className='col-md-6'>
      <div className='jumbotron'>
        <h1 className='text-center'>Balance Sheet</h1>
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
            <TableRow transactionArr={transactionArr} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SpendingTable
