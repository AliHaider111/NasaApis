import { FETCH_NEO_DATA, LOADER_STATE } from "../actionTypes";
import { toast } from "react-toastify";
import { apiHelper } from "../../utils/apiHelper"

export const FetchNeo = (query) => async (dispatch) => {
  try {
    dispatch({
      type: LOADER_STATE
    })
    let res = await apiHelper("get", `/nasa/neo-feed?${query}`)
    if (res?.data) {
      let { data } = res
      dispatch({
        type: FETCH_NEO_DATA,
        payload: data?.data
      })
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  finally {
    dispatch({
      type: LOADER_STATE
    })
  }
}