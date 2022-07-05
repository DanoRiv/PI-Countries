import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from '../../redux/actions';
import CountryCard from '../Cards'
import Error from '../Error';
import Filters from '../Filters';
import Nav from '../Nav'
import Pagination from '../Pagination';
import style from './home.module.css'


function Home() {

  const dispatch = useDispatch();
  const {countries, error} = useSelector(state => state);

  
  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch]);

  //Get continents
  const continents = countries.map(e  => e.continent)
  const unique = [...new Set(continents)]

  //Get activities
  const filter = countries.filter(e=> e.activities[0] !== undefined ? e.activities : null)
  const activities = filter.flatMap(e  => e.activities.map(e=> e.name))
  const uniqueAct = [...new Set(activities)]

  
  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10

  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const sliced = countries.slice(indexOfFirstPage, indexOfLastPage)
  const maxPages = Math.ceil(countries.length / postPerPage);




  return (
    <div className={style.homeContainer}>
      { error.hasOwnProperty('error') ? <Error/> :
      <>
      <Nav setPage={setCurrentPage}/>
      <nav className={style.navigation}>
        <Pagination setCurrentPage={setCurrentPage} page={currentPage} max={maxPages}/>
        <Filters setPage={setCurrentPage} continents={unique} activities={uniqueAct}/>
      </nav>
        {countries.length &&
        <CountryCard card={sliced}/>} 
      </>
      }
    </div>
  )
}

export default Home