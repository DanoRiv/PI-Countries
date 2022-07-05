import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { clearError, countryByName } from '../../redux/actions';

function SearchBar({setPage}) {

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setQuery(e.target.value)
    setTimeout(()=>dispatch(countryByName(query)), 500)
    setPage(1)
    if(e.target.value === '') dispatch(clearError())
  }

  const handleBlur = (e)=>{
    setQuery('')
  }

  return (
    <div>
      <input type="search" value={query} onChange={handleChange} onBlur={handleBlur} placeholder='Search country'/>
    </div>
  )
}

export default SearchBar