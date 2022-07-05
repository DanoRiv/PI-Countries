import React from 'react'
import { Link } from 'react-router-dom'
import style from './grid.module.css'

function CountryCard({ card }) {
  return (
    <div className={style.countryGrid}>
      {card.length ? card.map((c) => {
        const { id, name, continent, flag } = c;
        return (
          <div key={id} className={style.countrycard}>
            <div>
              <Link to={`/countries/${id}`}>
                <img src={flag} alt={name} height={213} width={320}/>
                <h4>{name}</h4>
                <h5>Continent</h5>
                <span>{continent}</span>
              </Link>
            </div>
          </div>
        );
      }) : 
      (<img
        src="https://pro2-bar-s3-cdn-cf.myportfolio.com/6c02e4e336ef5e266bdd14c6198fcfe8/189fa684-cfd4-4f1b-999a-a705871b9bfe_rwc_214x269x1093x1093x1093.gif?h=f6feb9b0ce51926e3cca85c6ea1328c5"
        alt="loading..."
        className={style.loadingGif}
      />)}
    </div>
  );
}

export default CountryCard