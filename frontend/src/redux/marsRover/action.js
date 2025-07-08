import { FETCH_MARS_DATA,LOADER, ERROR_STATE } from "../actionTypes";
import { toast } from "react-toastify";
import { apiHelper } from "../axios_intence"

export const FetchMarsRover = (camera) => async (dispatch) => {
  try {
    let res = await apiHelper("get", `/nasa/mars-photos?camera='RHAZ'&sol=900&rover=curiosity`)
    if (res?.data) {
      let { data } = res
      toast.success(data?.message)
      dispatch({
        type: FETCH_MARS_DATA,
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