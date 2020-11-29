import React from 'react'

function Select ({ label, name, handleChange, optionsArr }) {
  return (
    <>
      <label for={name}>{label}</label>
      <select className='form-control' name={name} onChange={(e) => handleChange(e)}>
        <option defaultValue>
                    -- select an option --
        </option>
        {optionsArr.map((option, key) => (
          <option key={key}>{option}</option>
        ))}
      </select>
    s
    </>
  )
}

export default Select
