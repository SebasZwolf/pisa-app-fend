import axiosInstance from "@/utils/axiosInstance";

class HomeService {
    async getHomeInfoByStudentId(studentId) {
        try {
            return axiosInstance.get(`/students/${studentId}/home`);
        } catch (error) {
            return error;
        }
    }

    async getHomeInfoByTeacherId(teacherId) {
        try {
            return axiosInstance.get(`/teachers/${teacherId}/home`);
        } catch (error) {
            return error;
        }
    }

    async getBoardInfoByStudentId(studentId) {
        try {
            return axiosInstance.get(`/student/${studentId}/board`);
        } catch (error) {
            return error;
        }
    }

    async getBoardInfoForTeacher() {
        try {
            return axiosInstance.get(`/teacher/board`);
        } catch (error) {
            return error;
        }
    }
}

export default new HomeService();
