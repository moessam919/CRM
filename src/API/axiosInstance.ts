import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://erp.rashodi.online", 
    baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use((config) => {
    // const token = localStorage.getItem("access_token");
    const token =
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDA1NjYzLCJpYXQiOjE3MzI4MDA4NjMsImp0aSI6IjBhZWRkNjdkYmM1YjQwMTRiZWU2MzVlNjNiZWE1NGQ4IiwidXNlcl9pZCI6MX0.VQ28dq3HjgRFp3YjT7-SX2FkohWXL5Ko8iD94_QdXzo";
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDEwOTEyLCJpYXQiOjE3MzI4MDYxMTIsImp0aSI6IjAxZTViNDYxZmYxMTQ3ZTBiOTM1MjVkYjcyOTc5NTAxIiwidXNlcl9pZCI6MX0.PDef9lxQm-OpsEis8otNh8RcE3CNUmVs3Hq7um40Kys";
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
