import { FETCH_NEO_DATA, LOADER_STATE } from '../actionTypes';

const initialState = {
   neo: [],
   loader: false,
}

const neoReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_NEO_DATA:
         return {
            ...state,
            neo: action.payload,
         }
      case LOADER_STATE: {
         return {
            ...state,
            loader: !state.loader
         }
      }
      default:
         return state
   }
}

export default neoReducer
