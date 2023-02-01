import axios from "axios";
import { BASE_URL } from "./config";


const apiService = axios.create({
    baseURL: BASE_URL,
});
apiService.interceptors.request.use(
    (request)=>{
        console.log("Start request", request);
        return request;
    },
    function(error){
        console.log("REQUEST ERROR",{error});
        return Promise.reject(error);
    }
);

apiService.interceptors.response.use(
    (response)=>{
        console.log("Response", response);
        return response.data;
    },
    function(error){
        console.log("RESPONSE ERROR",{error});
        const message = error.response?.data?.errors?.message || "Unknow error"
        return Promise.reject({message});
    }
);

export default apiService;