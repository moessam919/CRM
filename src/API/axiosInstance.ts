import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://erp.rashodi.online", // Base URL
});

axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem("access_token");
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNDQ3NzQxLCJpYXQiOjE3MzE4NDI5NDEsImp0aSI6IjFlYTkxMWZkMTUwYTQ0N2JiNTIwODMxNDk0MGU4ZjY0IiwidXNlcl9pZCI6MX0.X4QJzUG2jeyrSeDXoQHoFiL8n2fEftZQnbhE7Hh2WWA";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
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
