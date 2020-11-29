import React, { useState, useEffect } from 'react'
import Withdrawl from '../componenets/Withdrawl'
import Deposit from '../componenets/Deposit'
import SpendingTable from '../componenets/SpendingTable'

function Spending () {
  return (
    <>
      <div className='container-fluid mt-5 row'>
        <div className='col-md-6'>
          <div className='jumbotron'>
            <div className='row px-4'>
              <Withdrawl />
              <Deposit />
            </div>
          </div>
        </div>
        <SpendingTable />
      </div>
    </>
  )
}

export default Spending
