import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://erp.rashodi.online",
    // baseURL: "http://localhost:8000",
});
axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        try {
            const response = await axios.post("https://erp.rashodi.online/api/token", {
                username: "admin",
                password: "1234"
            });

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

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {ّ
//         if (error.response?.status === 401) {
//             const refreshToken = localStorage.getItem("refresh_token");
//             if (refreshToken) {
//                 try {
//                     // Attempt to refresh the token
//                     const response = await axios.post(
//                         "https://erp.rashodi.online/api/token/", // Adjust to your refresh token endpoint
//                         { refresh: refreshToken }
//                     );

//                     const { access } = response.data;
//                     localStorage.setItem("access_token", access);

//                     // Retry the original request with the new token
//                     error.config.headers.Authorization = `Bearer ${access}`;
//                     return axiosInstance(error.config);
//                 } catch (err) {
//                     console.error("Token refresh failed", err);
//                     // Handle logout or token expiration here, if necessary
//                 }
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
