import React from 'react'
import { Link } from 'react-router-dom'
import style from './nav.module.css'
import SearchBar from '../Search'

function Nav({setPage}) {
  return (
    <div className={style.nav}>
    <ul>
      <li>
      <Link to='/countries' className={style.navLink}>
        Home
      </Link>
      </li>
      <li>
      <Link to='/create/activity' className={style.navLink}>
        Create new activity
      </Link>
      </li>
      <li><SearchBar setPage={setPage}/> </li>
    </ul>
  </div>
  )
}

export default Nav