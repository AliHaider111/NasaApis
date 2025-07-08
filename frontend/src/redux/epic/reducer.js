import { FETCH_DATA, LOADER_STATE } from '../actionTypes';

const initialState = {
    epic: [],
    loader: false,
}

const epicReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                epic: action.payload,
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

export default epicReducer
