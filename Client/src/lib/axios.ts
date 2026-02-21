import axios from 'axios';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

const AxiosInstance = axios.create({
    baseURL: BACKEND_URI,
    withCredentials: true
})

export default AxiosInstance