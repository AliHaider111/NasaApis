import { FETCH_DATA, LOADER_STATE } from "../actionTypes";
import { toast } from "react-toastify";
import { apiHelper } from "../../utils/apiHelper"

export const FetchEpic = (query) => async (dispatch) => {
    try {
        dispatch({ type: LOADER_STATE });

        const res = await apiHelper("get", `/nasa/epic?${query}`);

        if (res.data) {
            const { data } = res;
            dispatch({
                type: FETCH_DATA,
                payload: data?.data,
            });
        }

    } catch (error) {
        const message =
            error?.response?.data?.message;
        toast.error(message);
    } finally {
        dispatch({ type: LOADER_STATE });
    }
};
