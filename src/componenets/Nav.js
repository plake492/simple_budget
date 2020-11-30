import React, { useState } from 'react'
import Select from './Select'

function Nav () {
  const [catOptions, setCatOptions] = useState([
    { item: 'Grocery', itemId: 1 },
    { item: 'Food Out', itemId: 2 },
    { item: 'Extra', itemId: 3 },
    { item: 'Bill', itemId: 4 },
    { item: 'Debt', itemId: 5 },
    { item: 'Gas', itemId: 6 },
    { item: 'Health', itemId: 7 },
    { item: 'Undefined', itemId: 8 }
  ])

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <a className='navbar-brand' href='#'>Navbar</a>
      <div className='form-inline ml-md-auto'>
        <Select optionsArr={catOptions} />
        <button
          id='search_cat_btn'
          className='btn btn-outline-secondary ml-2 my-2 my-sm-0 mr-2'
        >
          Search
        </button>
        <button
          id='reset_cat_btn'
          className='btn btn-outline-secondary my-2 my-sm-0'
        >
          Reset
        </button>
      </div>
    </nav>
  )
}

export default Nav
