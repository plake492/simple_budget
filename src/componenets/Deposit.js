import React from 'react'
import Select from './Select'
import { useForm } from 'react-hook-form'

function Deposit ({
  transaction,
  setTransaction,
  handleSubmit,
  accountOptions,
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
    <form className='col-lg-6 px-3' onSubmit={(e) => handleSubmit(e)}>
      <h1 className='mt-3'>Deposit</h1>
      <div className='row px-4'>
        <label for='amount'>Amount</label>
        <div className='input-group mb-3'>
          <input
            type='number'
            name='depositAmount'
            className='form-control'
            ref={register({ required: true })}
            onChange={(e) => handleChange(e, 'deposit')}
            disabled={toggle === 'withdrawl'}
          />
        </div>
      </div>
      <div className='row px-4'>
        <Select
          label='Account'
          name='account'
          optionsArr={accountOptions}
          ref={register({ required: true })}
          handleChange={handleChange}
          disabled={toggle === 'withdrawl'}
          type='deposit'
        />
      </div>
      <div className='px-2 mt-3 w-100'>
        <button type='button' className='btn-secondary p-3' onClick={() => clear()}>Clear</button>
        <button type='submit' className='btn-secondary ml-2 p-3' onClick={() => reset()}>Submit</button>
      </div>
    </form>
  )
}

export default Deposit
