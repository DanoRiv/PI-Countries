import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { clearPage, countryById } from '../../redux/actions'
import Error from '../Error';
import Nav from '../Nav';

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
          <div>
            <h4>{name}</h4>
            <p>{id}</p>
            <img src={flag} alt={name} />
            <div>
              <span>
                <p>{continent}</p>
                <p>{capital}</p>
                <p>{subregion}</p>
                <p>{area}</p>
                <p>{population}</p>
                <div>
                  {activities.map((e) => (
                    <>
                    <p>{e.name}</p>
                    <p>{e.difficulty}</p>
                    <p>{e.duration}</p>
                    <p>{e.season}</p>
                    </>
                  ))}
                </div>
              </span>
            </div>
          </div>
        ) : (
          <img
            src="https://bestanimations.com/media/food/690171314taco-animated-gif.gif"
            alt="loading gif"
            // className={style.loadingGif}
            width={200}
            height={200}
          />
        )}
      </div>
    </>
  );
}

export default CountryDetail