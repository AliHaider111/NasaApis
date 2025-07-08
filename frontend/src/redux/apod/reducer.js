import { FETCH_DATA, LOADER_STATE } from '../actionTypes';

const initialState = {
   apod: [],
   loader: false,
}

const apodReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_DATA:
         return {
            ...state,
            apod: action.payload,
         }
      case LOADER_STATE:
         return {
            ...state,
            loader: !state.loader
         }
      default:
         return state
   }
}

export default apodReducer
