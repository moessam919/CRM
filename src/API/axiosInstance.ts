import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://erp.rashodi.online",
    // baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem("access_token");
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0ODU3MTUxLCJpYXQiOjE3MzQyNTIzNTEsImp0aSI6IjdhN2ZhYjk0ODNlMjRiZTU5MDBjODY1MDY4MWFlYjFkIiwidXNlcl9pZCI6MX0.00m7qXRVk4JiM6f2qlAtjXzyZDqUQnM-R2Wvsqdiz_k";

    if (token) {
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
