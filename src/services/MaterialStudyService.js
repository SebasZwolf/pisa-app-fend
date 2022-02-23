import axiosInstance from "@/utils/axiosInstance";

class MaterialStudyService {
    async getStudyMaterialByTopicId(topicId) {
        try {
            return axiosInstance.get(`/topics/${topicId}/study-materials`);
        } catch (error) {
            return error;
        }
    }

    async getTopicsByAreaId(areaId) {
        try {
            return axiosInstance.get(`/areas/${areaId}/topics`);
        } catch (error) {
            return error;
        }
    }

    async getFileByStudyMaterialId(id) {
        try {
            return axiosInstance.get(`/study-materials/${id}/file`, { responseType: 'blob' });
        } catch (error) {
            return error;
        }
    }

    async createStudyMaterial(data) {
        try {
            return axiosInstance.post('/study-materials', data);
        } catch (error) {
            return error;
        }
    }

    async uploadStudyMaterial(id, data) {
        try {
            return axiosInstance.post(`/study-materials/${id}/upload`, data);
        } catch (error) {
            return error;
        }
    }
}

export default new MaterialStudyService();
