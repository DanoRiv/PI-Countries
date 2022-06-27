import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from '../../redux/actions';
import CountryCard from '../Cards'
import Error from '../Error';
import Nav from '../Nav'
import SearchBar from '../Search';
import style from './home.module.css'


function Home() {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCountries())
  }, []);



  return (
    <div className={style.homeContainer}>
      <Nav setPage={setPage}/>
      <nav>
        paginacion
        filtros
      </nav>
      { countries.hasOwnProperty('error') ? <Error/> :
        countries &&
        <CountryCard card={countries}/> 
      }
    </div>
  )
}

export default Home