import { FETCH_MARS_DATA,LOADER, ERROR_STATE } from '../actionTypes';

const initialState = {
   marsRover: {},
   success: false,
   loader: false,
   error: false,
}

const marsReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_MARS_DATA:
         return {
            ...state,
            marsRover: action.payload,
         }
      case ERROR_STATE:
         return {
            ...state,
            error: true
         }
      default:
         return state
   }
}

export default marsReducer
