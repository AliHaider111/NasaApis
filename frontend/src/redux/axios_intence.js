import axios from "axios";
import { toast } from 'react-toastify';
import { ENV } from "../config/config";

let baseUrl = process.env.REACT_APP_BASE_API

async function apiHelper(apiType, path, data, params) {
   if (baseUrl === undefined || !baseUrl) {
      baseUrl = ""
   }

   if (apiType === "post" || apiType === "put" || apiType === "get" || apiType === "delete" || apiType === "patch") {
      try {
         let response = await axios({
            method: apiType,
            url: `${baseUrl + path}`,
            data,
            headers: ENV.getHeaders()
         })
         return response
      } catch (error) {
         if (error.response?.data?.message) {
            let message = error.response?.data?.message;
            if(message == "jwt expired" || message == "invalid token")
               message = "Your session is expired please login again."
            toast.error(message)
         }
      }
   }
}

export { apiHelper };
