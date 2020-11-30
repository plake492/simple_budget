import React from 'react'

function Select ({ label, name, handleChange, optionsArr }) {
  return (
    <>
      {label ? (<label for={name}>{label}</label>) : null}
      <select
        className='form-control'
        name={name || null}
        onChange={handleChange ? (e) => handleChange(e) : null}
      >
        <option defaultValue> -- select an option -- </option>
        {optionsArr.map((option, key) => (
          <option key={key} data-id={option.itemId}>{option.item}</option>
        ))}
      </select>
    </>
  )
}

export default Select
