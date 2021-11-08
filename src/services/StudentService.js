import axiosInstance from "@/utils/axiosInstance";

class StudentService {
    async getStudentsByInstitution(institutionId) {
        try {
            return axiosInstance.get('/students', { params: { educationalInstitution: institutionId } });
        } catch (error) {
            return error;
        }
    }

    async createStudent(data) {
        try {
            return axiosInstance.post('/students', data);
        } catch (error) {
            return error;
        }
    }

    async editStudent(data, studentId) {
        try {
            return axiosInstance.put(`/students/${studentId}`, data);
        } catch (error) {
            return error;
        }
    }

    async deleteStudent(studentId) {
        try {
            return axiosInstance.delete(`/students/${studentId}`);
        } catch (error) {
            return error;
        }
    }
}

export default new StudentService();