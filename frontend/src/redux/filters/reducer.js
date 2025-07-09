import { SET_FILTERS, RESET_FILTERS } from "../actionTypes";

const initialState = {};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                [action.payload.component]: {
                    ...state[action.payload.component],
                    ...action.payload.filters,
                },
            };

        case RESET_FILTERS:
            return {
                ...state,
                [action.payload]: {},
            };

        default:
            return state;
    }
};

export default filterReducer;
