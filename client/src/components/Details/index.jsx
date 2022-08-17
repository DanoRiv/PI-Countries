import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { clearPage, countryById } from '../../redux/actions'
import Error from '../Error';
import Nav from '../Nav';
import style from './details.module.css'

function CountryDetail() {

  const dispatch = useDispatch();
  const { countryId } = useParams();
  const details = useSelector(state => state.details);

  useEffect(() => {
    dispatch(countryById(countryId))

    return()=>{
      dispatch(clearPage())
    }
  }, [dispatch, countryId]);

  const {id, flag, name, continent, capital, subregion, area, population, activities} = details

  return (
    <>
      <Nav />
      <div>
        {details.hasOwnProperty('error') ? <Error/> :
        name ? (
          <div className={style.detailsContainer}>
            <div className={`${style.item} ${style.details}`}>
            <h4>{name} - {id}</h4>
            <img src={flag} alt={name} />
              <span>
                <p>Continent: {continent}</p>
                <p>Capital: {capital}</p>
                <p>Subregion: {subregion}</p>
                <p>Area: {Number(area).toLocaleString('es')} km²</p>
                <p>Population: {Number(population).toLocaleString('es')}</p>
              </span>
            </div>
              {activities.length && <div className={`${style.item} ${style.activityCard}`}>
                {activities.map((e, index) => (
                  <div key={index}>
                    <h3>Activities</h3>
                  <p>Name: {e.name}</p>
                  <p>Difficulty: {e.difficulty}</p>
                  <p>Duration: {e.duration}</p>
                  <p>Season: {e.season}</p>
                  </div>
                ))}
              </div>}
          </div>
        ) : (
          <img
            src="https://pro2-bar-s3-cdn-cf.myportfolio.com/6c02e4e336ef5e266bdd14c6198fcfe8/189fa684-cfd4-4f1b-999a-a705871b9bfe_rwc_214x269x1093x1093x1093.gif?h=f6feb9b0ce51926e3cca85c6ea1328c5"
            alt="loading gif"
            className={style.loadingGif}
            width={200}
            height={200}
          />
        )}
      </div>
    </>
  );
}

export default CountryDetail