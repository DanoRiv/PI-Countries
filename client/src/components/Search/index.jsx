import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearError, countryByName } from '../../redux/actions';
import style from './search.module.css'

function SearchBar({setPage}) {

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (e)=>{
    setQuery(e.target.value)
    setTimeout(()=>dispatch(countryByName(query)), 500)
    location.pathname === '/countries' && setPage(1)
    if(e.target.value === '') dispatch(clearError())
  }

  const handleBlur = ()=>{
    setQuery('')
  }

  return (
    <div>
      <input type="search" className={style.searchInput} value={query} onChange={handleChange} onBlur={handleBlur} placeholder='Search country'/>
    </div>
  )
}

export default SearchBar