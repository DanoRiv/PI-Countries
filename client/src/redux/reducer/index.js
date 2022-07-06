import { GET_COUNTRIES, COUNTRY_DETAILS, SEARCH_COUNTRY, CLEAR_PAGE, SORT_AZ, CLEAR_ERROR, SORT_POPULATION, SORT_CONTINENT, SORT_ACTIVITY} from "../actions/actionTypes";

const initialState = {
  countries: [],
  aux: [],
  details: {},
  error: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
        aux: payload
      };
    case COUNTRY_DETAILS:
      return {
        ...state,
        details: payload,
      };
    case SEARCH_COUNTRY:
      if (payload.hasOwnProperty("error")) return { ...state, error: payload };
      return {
        ...state,
        countries: payload,
      };

    case SORT_AZ:
      if (payload === "az") {
        const asc = state.countries.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        return {
          ...state,
          countries: asc,
        };
      } else if (payload === "za") {
        const desc = state.countries.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
        return {
          ...state,
          countries: desc,
        };
      }
      return {
        ...state,
      };
    case SORT_POPULATION:
      if (payload === "menor") {
        const asc = state.countries.sort((a, b) =>
          parseInt(a.population) > parseInt(b.population) ? 1 : parseInt(a.population) < parseInt(b.population) ? -1 : 0
        );
        return {
          ...state,
          countries: asc,
        };
      } else if (payload === "mayor") {
        const desc = state.countries.sort((a, b) =>
          parseInt(a.population) < parseInt(b.population) ? 1 : parseInt(a.population) > parseInt(b.population) ? -1 : 0
        );
        return {
          ...state,
          countries: desc,
        };
      }
      return {
        ...state,
      };
    case SORT_CONTINENT: 
    if(payload){
      const continent = payload === 'all' ? state.aux : state.aux.filter(cont => (cont.continent === payload));
      return{
        ...state,
        countries: continent
      }
    }
    return{
      ...state
    }
    case SORT_ACTIVITY:
      if(payload){
        const filterAct = payload === 'allAct' ? state.aux : state.aux.filter(act => {
          const activities = act.activities?.map(a=> a.name)
          if(activities.includes(payload)){
            return act
          }
          return null 
        })
        return{
          ...state,
          countries: filterAct
        }
      }
      return{
        ...state
      }
    case CLEAR_PAGE:
      return {
        ...state,
        countries: [],
        details: {},
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
