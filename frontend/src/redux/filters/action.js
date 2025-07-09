
import { SET_FILTERS, RESET_FILTERS } from "../actionTypes";

export const setFilters = (component, filters) => ({
    type: SET_FILTERS,
    payload: { component, filters },
});

export const resetFilters = (component) => ({
    type: RESET_FILTERS,
    payload: component,
});
