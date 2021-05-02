import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

  const history = useHistory()

  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return(
    <nav>
      <div>
        <ul>
          <li><NavLink to="/create">Crate</NavLink></li>
          <li><NavLink to="/links" >Links</NavLink></li>
          <li><a href="/" onClick={logoutHandler} >Log out</a></li>
        </ul>
      </div>
    </nav>
  )
}