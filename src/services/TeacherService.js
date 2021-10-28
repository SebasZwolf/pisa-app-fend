import axiosInstance from "@/utils/axiosInstance";

class TeacherService {
    async getTeachersByInstitution(institutionId) {
        try {
            return axiosInstance.get('/teachers', { params: { educationalInstitution: institutionId } });
        } catch (error) {
            return error;
        }
    }

    async createFirstUser(data) {
        try {
            return axiosInstance.post('/create-first-user', data);
        } catch (error) {
            return error;
        }
    }

    async createTeacher(data) {
        try {
            return axiosInstance.post('/teachers', data);
        } catch (error) {
            return error;
        }
    }

    async deleteTeacher(teacherId) {
        try {
            return axiosInstance.delete(`/teachers/${teacherId}`);
        } catch (error) {
            return error;
        }
    }
}

export default new TeacherService();