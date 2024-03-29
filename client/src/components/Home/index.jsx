import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearPage, getCountries } from '../../redux/actions';
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

    return()=>{
      dispatch(clearPage())
    }
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
        {countries.length ?
        <CountryCard card={sliced}/> : (<img
          src="https://pro2-bar-s3-cdn-cf.myportfolio.com/6c02e4e336ef5e266bdd14c6198fcfe8/189fa684-cfd4-4f1b-999a-a705871b9bfe_rwc_214x269x1093x1093x1093.gif?h=f6feb9b0ce51926e3cca85c6ea1328c5"
          alt="loading..."
          className={style.loadingGif}
        />)} 
      </>
      }
    </div>
  )
}

export default Home