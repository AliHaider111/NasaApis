import { FETCH_DATA, ERROR_STATE } from "./apodTypes";
import { toast } from "react-toastify";
import { apiHelper } from "../axios_intence"

export const FetchApod = (date) => async (dispatch) => {
  try {
    let res = await apiHelper("get", `/apod?date=${date}`)
    if (res?.data) {
      let { data } = res
      toast.success(data?.message)
      dispatch({
        type: FETCH_DATA,
        payload: data
      })
    }
    else {
      dispatch({
        type: ERROR_STATE
      })
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
}