import axiosInstance from "../utils/axiosInstance";

class ProfileService {
    async getUserById(userId) {
        try {
            const response = axiosInstance.get(`/users/${userId}`);
            return response;
        } catch (error) {
            return error;
        }
    }

    async getPreregisteredEducationalInstitutions() {
        try {
            const response = axiosInstance.get('/educational-institutions/pre-registered');
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new ProfileService();