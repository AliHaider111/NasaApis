import { FETCH_DATA, ERROR_STATE } from './apodTypes';

const initialState = {
   apod: {},
   success: false,
   error: false,
}

const apodReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_DATA:
         return {
            ...state,
            apod: action.payload,
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

export default apodReducer
