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

    async editClassroom(data, classroomId) {
        try {
            return axiosInstance.put(`/class-rooms/${classroomId}`, data);
        } catch (error) {
            return error;
        }
    }

    async deleteClassroom(classroomId) {
        try {
            return axiosInstance.delete(`/class-rooms/${classroomId}`);
        } catch (error) {
            return error;
        }
    }

    async assignTeacherToClassroom(teacherId, classroomId) {
        try {
            return axiosInstance.post('/organization', null, { params: { teacher: teacherId, classRoom: classroomId }})
        } catch (error) {
            return error;
        }
    }

     async getClassroomByTeacher(teacherId) {
        try {
            return axiosInstance.get(`/teachers/${teacherId}/class-rooms`);
        } catch (error) {
            return error;
        }
     }
}

export default new ClassroomService();