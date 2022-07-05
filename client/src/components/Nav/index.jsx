import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './nav.module.css'
import SearchBar from '../Search'
import { useDispatch } from 'react-redux';
import { getCountries } from '../../redux/actions';

function Nav({setPage}) {

  const location = useLocation();

  const dispatch = useDispatch();
  const handleRestart = ()=>{
    dispatch(getCountries())
    location.pathname === '/countries' && setPage(1)
  }

  return (
    <div className={style.nav}>
    <ul>
      <li>
      <Link to='/countries' className={style.navLink} onClick={handleRestart}>
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