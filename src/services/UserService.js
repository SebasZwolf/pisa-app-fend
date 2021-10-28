import axiosInstance from "@/utils/axiosInstance";

class UserService {
    async getUserById(userId) {
        try {
            return axiosInstance.get(`/users/${userId}`);
        } catch (error) {
            return error;
        }
    }

    async changeUserPassword(userId, data) {
        try {
            return axiosInstance.put(`/users/${userId}`, data);
        } catch (error) {
            return error;
        }
    }
}

export default new UserService();