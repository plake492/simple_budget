import React from 'react'
import { Link } from 'react-router-dom'

function Nav () {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <a className='navbar-brand' href='/'>Money</a>
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
