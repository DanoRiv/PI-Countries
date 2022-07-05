import { GET_COUNTRIES, COUNTRY_DETAILS, SEARCH_COUNTRY, CLEAR_PAGE, CLEAR_ERROR, CREATE_ACTIVITY, SORT_AZ, SORT_POPULATION, SORT_CONTINENT, SORT_ACTIVITY } from "./actionTypes";
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
export const createActivity = (activity) =>{
    return async dispatch=>{
        await axios.post('http://localhost:3001/activity', activity)
        dispatch({type: CREATE_ACTIVITY})
    }
}
export const sortAlpha = (payload)=>{
    return{
        type: SORT_AZ,
        payload
    }
}
export const sortPopulation = (payload)=>{
    return{
        type: SORT_POPULATION,
        payload
    }
}
export const filterContinent = (payload)=>{
    return{
        type: SORT_CONTINENT,
        payload
    }
}
export const filterActivity = (payload)=>{
    return{
        type: SORT_ACTIVITY,
        payload
    }
}
export const clearPage = () =>{
    return {
        type: CLEAR_PAGE
    }
}
export const clearError = () =>{
    return {
        type: CLEAR_ERROR
    }
}