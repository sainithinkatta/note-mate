import axios from 'axios';

// Uncomment while using local development.
// export const BASE_URL = 'http://localhost:8080/api/'
export const BASE_URL = 'https://note-mate-backend.vercel.app/api/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;