import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://erp.rashodi.online",
    // baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        try {
            const response = await axios.post(
                "https://erp.rashodi.online/api/token",
                {
                    username: "admin",
                    password: "1234",
                }
            );

            const { access } = response.data;
            localStorage.setItem("access_token", access);

            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${access}`;
        } catch (error) {
            console.error("Failed to get token", error);
            return Promise.reject(error);
        }
    } else {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
