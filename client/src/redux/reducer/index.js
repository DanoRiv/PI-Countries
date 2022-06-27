import { GET_COUNTRIES, COUNTRY_DETAILS, SEARCH_COUNTRY, CLEAR_PAGE, CREATE_ACTIVITY } from '../actions/actionTypes'

const initialState = {
    countries: [],
    details: {},
    error: []
}

const rootReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case GET_COUNTRIES: return{
            ...state,
            countries: payload
        }
        case COUNTRY_DETAILS: return{
            ...state,
            details: payload
        }
        case SEARCH_COUNTRY: return{
            ...state,
            countries: payload
        }
        case CLEAR_PAGE: return {
            ...state,
            details: {}
        }
        default: return state
    }
}

export default rootReducer;