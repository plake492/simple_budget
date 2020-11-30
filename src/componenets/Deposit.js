import React, { useState } from 'react'
import Select from './Select'

function Deposit ({ transaction, setTransaction, handleSubmit, accountOptions }) {
  const handleChange = e => {
    const { name, value } = e.target
    if (transaction.type !== 'deposit') {
      setTransaction({})
    }
    setTransaction({ ...transaction, type: 'deposit', [name]: value })
  }

  return (
    <div className='col-md-6 px-3'>
      <h1 className='mt-3'>Deposit</h1>
      <div className='row px-4'>
        <label for='amount'>Amount</label>
        <div className='input-group mb-3'>
          <input
            type='number'
            name='depositAmount'
            className='form-control'
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className='row px-4'>
        <Select label='Account' name='account' optionsArr={accountOptions} handleChange={handleChange} />
      </div>
      <div className='px-2 mt-3 w-100'>
        <button className='btn-secondary p-3' onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  )
}

export default Deposit
