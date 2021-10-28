import axiosInstance from "@/utils/axiosInstance";

class EducationalInstitutionService {
    async getPreregisteredEducationalInstitutions() {
        try {
            return axiosInstance.get('/educational-institutions/pre-registered');
        } catch (error) {
            return error;
        }
    }
}

export default new EducationalInstitutionService();