import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://erp.rashodi.online",
    // baseURL: "http://localhost:8000",
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
});

// axiosInstance.interceptors.request.use(async (config) => {
//     if (!document.cookie.includes("csrftoken")) {
//         try {
//             await axios.get("https://erp.rashodi.online/auth/csrf/", {
//                 withCredentials: true,
//             });
//         } catch (error) {
//             console.error("Error fetching CSRF token:", error);
//         }
//     }
//     return config;
// });

export default axiosInstance;
