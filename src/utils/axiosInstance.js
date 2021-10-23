import axios from "axios";
import store from "../store";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api"
});

axiosInstance.interceptors.request.use((config) => {
    const newConfig = {...config};
    const token = store.getters.getToken;
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
});

export default axiosInstance;