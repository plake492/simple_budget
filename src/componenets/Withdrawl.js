import React from 'react'
import Select from './Select'
import { useForm } from 'react-hook-form'

function DepositWithdrawl ({
  transaction,
  setTransaction,
  handleSubmit,
  cardOptions,
  catOptions,
  handleChange,
  toggle,
  setToggle

}) {
  const { register, reset } = useForm()

  const clear = () => {
    setToggle('')
    reset()
  }

  return (
    <form
      className='col-lg-12' onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className='mt-3'>Withdraw</h1>
      <div className='row px-4'>
        <label for='amount'>Amount</label>
        <div className='input-group mb-3'>
          <input
            name='withdrawlAmount'
            type='number'
            className='form-control'
            ref={register({ required: true })}
            disabled={toggle === 'deposit'}
            onChange={(e) => handleChange(e, 'withdrawl')}
          />
        </div>
      </div>
      {/* <div className='row px-4 mb-3'>
        <Select
          label='Card Used'
          name='cardUsed'
          handleChange={handleChange}
          ref={register({ required: true })}
          disabled={toggle === 'deposit'}
          optionsArr={cardOptions}
          type='withdrawl'
        />
      </div> */}
      <div className='row px-4 mb-3'>
        <Select
          label='Category'
          name='category'
          handleChange={handleChange}
          ref={register({ required: true })}
          disabled={toggle === 'deposit'}
          optionsArr={catOptions}
          type='withdrawl'
        />
      </div>
      <div className='row px-4'>
        <label for='paidTo'> Paid To</label>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            name='paidTo'
            ref={register({ required: true })}
            disabled={toggle === 'deposit'}
            onChange={(e) => handleChange(e, 'withdrawl')}
          />
        </div>
      </div>
      {/* <div className='row px-4'>
        <label for='paidTo'>Date</label>
        <div className='input-group mb-3'>
          <input
            type='date'
            className='form-control'
            placeholder={Date.now()}
            name='date'
            ref={register({ required: true })}
            disabled={toggle === 'deposit'}
            onChange={(e) => handleChange(e, 'withdrawl')}
          />
        </div>
      </div> */}
      <div className='row px-4'>
        <label for='paidTo'> Notes</label>
        <div className='input-group mb-3'>
          <textarea
            type='text'
            className='form-control'
            name='notes'
            ref={register({ required: true })}
            disabled={toggle === 'deposit'}
            onChange={(e) => handleChange(e, 'withdrawl')}
          />
        </div>
      </div>
      <div className='px-2 mt-3 w-100'>
        <button type='button' className='btn-primary p-3' onClick={() => clear()}>Clear</button>
        <button type='submit' className='btn-primary  ml-2 p-3' onClick={() => reset()}>Submit</button>
      </div>
    </form>
  )
}

export default DepositWithdrawl
