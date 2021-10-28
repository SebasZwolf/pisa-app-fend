import axiosInstance from "@/utils/axiosInstance";

class AuthService {
    async login(data) {
        try {
            return axiosInstance.post('/login', data);
        } catch (error) {
            return error;
        }
    }
}

export default new AuthService();