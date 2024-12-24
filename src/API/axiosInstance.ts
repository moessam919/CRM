import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://erp.rashodi.online",
    withCredentials: true,
});
export default axiosInstance;
