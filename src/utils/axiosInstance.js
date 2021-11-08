import axios from "axios";
import store from "../store";
import Vue from "vue";

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

axiosInstance.interceptors.response.use(response => response, (error) => {
    if (!error.response) {
        Vue.swal('El servidor no se encuentra disponible. Reintente más tarde.', '', 'error');
        return null;
    } else {
        return Promise.reject(error);
    }
});

export default axiosInstance;