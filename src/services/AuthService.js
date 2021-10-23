import axiosInstance from "../utils/axiosInstance";

class AuthService {
    async login(data) {
        try {
            const response = axiosInstance.post('/login', data);
            return response;
        } catch (error) {
            return error;
        }
    }

    async createFirstUser(data) {
        try {
            const response = axiosInstance.post('/create-first-user', data);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new AuthService();