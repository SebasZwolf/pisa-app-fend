import axiosInstance from "@/utils/axiosInstance";

class ExamService {
    async getExamsByClassroom(classroomId) {
        try {
            return axiosInstance.get('/exams', { params: { classRoom: classroomId }})
        } catch (error) {
            return error;
        }
    }

    async getExamsByArea(areaId, classroomId) {
        try {
            return axiosInstance.get('/exams', { params: { area: areaId, classRoom: classroomId}})
        } catch (error) {
            return error;
        }
    }

    async getAreas() {
        try {
            return axiosInstance.get('/areas');
        } catch (error) {
            return error;
        }
    }

    async createExam(data) {
        try {
            return axiosInstance.post('/exams', data);
        } catch (error) {
            return error;
        }
    }
}

export default new ExamService();