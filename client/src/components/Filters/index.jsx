import React from 'react'
import { useDispatch } from 'react-redux';
import { filterActivity, filterContinent, sortAlpha, sortPopulation } from '../../redux/actions';

function Filters({setPage, continents, activities}) {

  const dispatch = useDispatch();

  const handleAz = (e)=>{
    dispatch(sortAlpha(e.target.value))
    setPage(1)
  }
  const handlePopulation = (e)=>{
    dispatch(sortPopulation(e.target.value))
    setPage(1)
  }
  const handleContinent = (e)=>{
    dispatch(filterContinent(e.target.value))
    setPage(1)
  }
  const handleActivity = (e)=>{
    dispatch(filterActivity(e.target.value))
    setPage(1)
  }
  
  return (
    <div>
      <div>
        <select defaultValue="" onChange={handleAz}>
          <option value="">Sort alphabetic</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>
      <div>
        <select defaultValue="" onChange={handlePopulation}>
          <option value="">Sort population</option>
          <option value="menor">Ascending</option>
          <option value="mayor">Descending</option>
        </select>
      </div>
      <div>
        <select defaultValue="" onChange={handleContinent}>
          <option value="">Filter by continent</option>
          <option value="all">Show all</option>
          {continents.map((e, index) => (
            <option key={index} value={e}> {e} </option>
          ))}
        </select>
      </div>
      <div>
        <select defaultValue="" onChange={handleActivity}>
          <option value="">Filter by activity</option>
          <option value="allAct">Show all</option>
          {activities.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters