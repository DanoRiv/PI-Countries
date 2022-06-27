import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { countryByName } from '../../redux/actions';

function SearchBar({setPage}) {

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setQuery(e.target.value)
    setTimeout(()=>dispatch(countryByName(query)), 500)
  }

  const handleBlur = (e)=>{
    setQuery('')
    setPage(1)
  }

  return (
    <div>
      <input type="search" value={query} onChange={handleChange} onBlur={handleBlur}/>
    </div>
  )
}

export default SearchBar