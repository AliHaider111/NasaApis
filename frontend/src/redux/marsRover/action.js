import { FETCH_MARS_DATA, LOADER_STATE } from "../actionTypes";
import { toast } from "react-toastify";
import { apiHelper } from "../axios_intence"

export const FetchMarsRover = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADER_STATE
    })
    let res = await apiHelper("get", `/nasa/mars-photos?camera=RHAZ&sol=900&rover=curiosity`)
    if (res?.data) {
      let { data } = res
      dispatch({
        type: FETCH_MARS_DATA,
        payload: data?.data?.photos
      })
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
  finally {
    dispatch({
      type: LOADER_STATE
    })
  }
}