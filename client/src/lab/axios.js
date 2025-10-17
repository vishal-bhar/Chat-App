
import axios, {Axios} from "axios";

export const axiosInstance=axios.create({
    baseURL:import.meta.env.MODE==="development" ? "http://localhost:4000/api/v1" :"/",
    withCredentials:true,
});