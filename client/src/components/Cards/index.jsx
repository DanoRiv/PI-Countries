import React from 'react'
import { Link } from 'react-router-dom'
import style from './grid.module.css'

function CountryCard({ card }) {
  return (
    <div className={style.countryGrid}>
      {card.length ? card.map((c) => {
        const { id, name, continent, flag } = c;
        return (
          <div key={id}>
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
        src="https://i.pinimg.com/originals/4e/71/44/4e7144a5bf2b71dff496e43d9ec5380a.gif"
        alt="loading..."
        className={style.loadingGif}
      />)}
    </div>
  );
}

export default CountryCard