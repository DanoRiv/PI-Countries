import React from 'react'
import { Link } from 'react-router-dom'
import style from './landing.module.css'


function Landing() {
  return (
    <div className={style.landing} >
      <div className={style.buttonContainer}>
        <Link to='/countries'>
            <div className={style.button}> WELCOME! </div>
        </Link>
      </div>
    </div>
  )
}

export default Landing