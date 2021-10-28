import axiosInstance from "@/utils/axiosInstance";

class ClassroomService {
    async getClassroomByInstitution(institutionId) {
        try {
            return axiosInstance.get('/class-rooms', { params: { educationalInstitution: institutionId } });
        } catch (error) {
            return error;
        }
    }

    async createClassroom(data) {
        try {
            return axiosInstance.post('/class-rooms', data);
        } catch (error) {
            return error;
        }
    }
}

export default new ClassroomService();