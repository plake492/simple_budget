import React from 'react'

function Deposit () {
  return (
    <div className='col-md-6 px-3'>
      <h1 className='mt-3'>Deposit</h1>
      <div className='row px-4'>
        <label for='d_amount'>Amount</label>
        <div className='input-group mb-3'>
          <input
            id='d_amount'
            type='number'
            min='1'
            step='any'
            className='form-control'
          />
        </div>
      </div>
      <div className='row px-4'>
        <label for='d_account'>Account</label>
        <select id='d_account' className='form-control'>
          <option disabled selected value>
                -- select an option --
          </option>
          <option>Checking</option>
          <option>Saving</option>
        </select>
      </div>
      <div className='px-2 mt-3 w-100'>
        <button id='dep' className='btn-secondary p-3'>Submit</button>
      </div>
    </div>
  )
}

export default Deposit
