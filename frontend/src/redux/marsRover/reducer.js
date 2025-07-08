import { FETCH_MARS_DATA, LOADER_STATE } from '../actionTypes';

const initialState = {
   marsRover: [],
   loader: false,
}

const marsReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_MARS_DATA:
         return {
            ...state,
            marsRover: action.payload,
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

export default marsReducer
