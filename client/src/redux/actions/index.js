import { GET_COUNTRIES, COUNTRY_DETAILS, SEARCH_COUNTRY, CLEAR_PAGE, CREATE_ACTIVITY } from "./actionTypes";
import axios from 'axios';

export const getCountries = ()=>{
    return async dispatch=>{
  
        await axios.get('http://localhost:3001/countries')
        .then(result => dispatch({
                type: GET_COUNTRIES,
                payload: result.data
            })
        )
        .catch((error)=> dispatch({type: GET_COUNTRIES, payload: error.response}))
    }
}
export const countryById = (id) =>{
    return async dispatch=>{
        await axios.get(`http://localhost:3001/countries/${id}`)
        .then(res => dispatch({
            type: COUNTRY_DETAILS,
            payload: res.data
        }))
        .catch(error=> dispatch({type: COUNTRY_DETAILS, payload: {error: error.response.data}}))
    }
}
export const countryByName = (search) =>{
    return async dispatch=>{
        await axios.get(`http://localhost:3001/countries?name=${search}`)
        .then(result=> dispatch({
            type: SEARCH_COUNTRY,
            payload: result.data
        }))
        .catch(error=> dispatch({type: SEARCH_COUNTRY, payload: {error: error.response.data}}))
    }
}
export const clearPage = () =>{
    return {
        type: CLEAR_PAGE
    }
}