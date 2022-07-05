import React from 'react'
import { useDispatch } from 'react-redux';
import { clearError, getCountries } from '../../redux/actions';
import style from './error.module.css'

function Error() {

  const dispatch = useDispatch();

  const handleBack = ()=>{
    dispatch(clearError())
    dispatch(getCountries())
  }

  return (
    <div className={style.errorContainer}>
      <button onClick={handleBack} className={style.button}>Go Back</button>
    </div>
  )
}

export default Error