import React, { useState } from 'react'
import './style.css'
import { useForm } from 'react-hook-form'

function MonthBudget () {
  const { register, reset } = useForm()

  const [budgetItem, setBudgetItem] = useState({})
  const [budgetArr, setBudgetArr] = useState([])

  const handelChange = e => {
    const { name, value } = e.target
    setBudgetItem({ ...budgetItem, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    reset()
    setBudgetArr([...budgetArr, budgetItem])
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Item</th>
                <th scope='col'>Budgetd</th>
                <th scope='col'>Actual</th>
              </tr>
            </thead>
            <tbody>
              {budgetArr.map((item, index) => (
                <tr key={index}>
                  <th>
                    <input
                      type='text' name='item' value={item.item} onChange={(e) => handelChange(e)}
                    />
                  </th>
                  <td>
                    <input
                      type='number' name='budgeted' value={item.budgeted} onChange={(e) => handelChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      type='number' name='actual' value={item.actual} onChange={(e) => handelChange(e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <form onSubmit={(e) => handleSubmit(e)} className='d-flex'>
            <input
              ref={register({ required: true })}
              type='text'
              name='item'
              onChange={(e) => handelChange(e)}
            />
            <input
              ref={register({ required: true })}
              type='number'
              name='budgeted'
              onChange={(e) => handelChange(e)}
            />
            <input
              ref={register({ required: true })}
              type='number'
              name='actual' onChange={(e) => handelChange(e)}
            />
            <button type='submit' className='btn-secondary ml-2 p-3' onClick={() => reset()}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MonthBudget
