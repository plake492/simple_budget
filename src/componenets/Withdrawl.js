import React, { useState } from 'react'
import Select from './Select'

function DepositWithdrawl () {
  const [withdrawl, setwithdrawl] = useState({ type: 'withdrawl' })
  const [catOptions, setCatOptions] = useState([
    'Grocery',
    'Food Out',
    'Extra',
    'Bill',
    'Debt',
    'Gas',
    'Health',
    'Undefined'
  ])
  const [cardOptions, setCardOptions] = useState(['**** **** **** 0000'])

  const handleChange = e => {
    const { name, value } = e.target
    setwithdrawl({ ...withdrawl, [name]: value })
  }
  console.log('withdrawl==>>', withdrawl)
  return (
    <div className='col-md-6'>
      <h1 className='mt-3'>Withdraw</h1>
      <div className='row px-4'>
        <label for='w_amount'>Amount</label>
        <div className='input-group mb-3'>
          <input
            id='w_amount'
            name='amount'
            type='number'
            className='form-control'
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className='row px-4 mb-3'>
        <Select
          label='Card Used'
          name='cardUsed'
          handleChange={handleChange}
          optionsArr={cardOptions}
        />
      </div>
      <div className='row px-4 mb-3'>
        <Select
          label='Category'
          name='category'
          handleChange={handleChange}
          optionsArr={catOptions}
        />
      </div>
      <div className='row px-4'>
        <label for='paidTo'> Paid To</label>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            name='paidTo'
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className='px-2 mt-3 w-100'>
        <button id='with' className='btn-primary p-3'>Submit</button>
      </div>
    </div>
  )
}

export default DepositWithdrawl
