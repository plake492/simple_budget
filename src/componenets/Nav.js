import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreContext } from '../utils/GlobalState'

function Nav () {
  const underline = {
    borderBottom: 'black 1px solid',
    color: 'hsl(225, 2, 80)'
  }
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [state, dispatch] = useStoreContext()

  const updateDate = (value, month) => {
    if (month) {
      dispatch({ type: 'UPDATE_FOCUS_DATE', date: value + '_' + state.focusYear })
      dispatch({ type: 'UPDATE_FOCUS_MONTH', month: value })
    } else {
      dispatch({ type: 'UPDATE_FOCUS_DATE', date: state.focusMonth + '_' + value })
      dispatch({ type: 'UPDATE_FOCUS_YEAR', year: value })
    }
  }

  return (
    <nav className='navbar navbar-dark bg-dark'>
      <a className='h1 mt-n3 text-light' href='/'>Money</a>
      <div className='d-flex flex-row flex-fill justify-content-end mx-5'>
        <div className='flex-fill month_select d-flex justify-content-between px-4 pt-3 rounded mb-4' style={{ backgroundColor: '#DEDEE0' }}>
          {months.map((month, index) => (
            <p
              style={state.focusMonth === month ? underline : null}
              key={index}
              onClick={() => updateDate(month, true)}
            >{month}
            </p>
          ))}
        </div>
        <div className='pt-1'>
          <select
            className='form-control ml-2'
            onChange={(e) => updateDate(e.target.value, false)}
          >
            <option value=''>Year</option><option value='2018'>2018</option><option value='2019'>2019</option><option value='2020'>2020</option><option value='2021'>2021</option><option value='2022'>2022</option>
          </select>
        </div>
      </div>
      <div className='ml-auto'>
        <ul>
          <li className='nav-item'>
            <Link className='nav-link' style={{ color: 'whitesmoke' }} to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' style={{ color: 'whitesmoke' }} to='/budget'>budget</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
