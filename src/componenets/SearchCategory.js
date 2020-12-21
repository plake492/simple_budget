import React from 'react'
import Select from './Select'

function SearchCategory ({ searchByCat, catOptions, handleChangeSearch, resetCat, searchByKeyWord, handleChangeKeyword }) {
  return (
    <>
      <div className='row'>
        <form onSubmit={(e) => searchByCat(e)} className='form-inline ml-md-auto col-6'>
          <Select
            optionsArr={catOptions}
            handleChange={handleChangeSearch}
          />
          <button
            type='submit'
            className='btn  ml-2 my-2 my-sm-0 mr-2 btn_no-border'
          >
        Search
          </button>
          <button
            type='button'
            className='btn my-2 my-sm-0 btn_no-border'
            onClick={() => resetCat()}
          >
        Reset
          </button>
        </form>
        <form className='col-6' onSubmit={(e) => searchByKeyWord(e)}>
          <div className='d-flex flex-row justify-content-between'>
            <label className='col-6 pt-3'>Search by key word / number: </label>
            <input
              name='keyWordSearch'
              type='text'
              className='form-control col-6'
              onChange={(e) => handleChangeKeyword(e)}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default SearchCategory
