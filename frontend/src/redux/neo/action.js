import { FETCH_NEO_DATA, LOADER_STATE } from "../actionTypes";
import { toast } from "react-toastify";
import { apiHelper } from "../axios_intence"

export const FetchNeo = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADER_STATE
    })
    let res = await apiHelper("get", `/nasa/neo-feed`)
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