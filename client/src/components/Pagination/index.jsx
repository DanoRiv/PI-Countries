import React from 'react'
import style from './pagination.module.css'

function Pagination({page, setCurrentPage, max}) {

  const nextPage = ()=>{
    if(page < max) {
    setCurrentPage(p => p + 1)
  }}  
  const prevPage = ()=>{
    if(page > 1 ) {
    setCurrentPage(p=> p - 1)
  }}  
  
  return (
    <div className={style.pagination}>
    <div className={style.numbers}>
      {page !== 2 && page > 1 && (
        <button onClick={()=>setCurrentPage(1)}>
            First
        </button>
      )}
      {page > 1 && (
        <button onClick={prevPage}>
         ←
        </button>
      )}
      {page !== 1 && (
        <button onClick={prevPage}>
            {page - 1}
        </button>
      )}
      <button className={style.current}>
          {page}
      </button>
      {page !== max && (
        <button onClick={nextPage}>
          {page + 1}
        </button>
      )}
      {(page + 1 )<= max && (
        <button onClick={nextPage}>
        →
        </button>
      )}
      {page !== (max - 1) && page < max && (
        <button onClick={()=>setCurrentPage(max)}>
        Last
        </button>
      )}
    </div>
  </div>
  )
}

export default Pagination