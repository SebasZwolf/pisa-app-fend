import axiosInstance from "@/utils/axiosInstance";

class ThunderTestService {
    async startThunderTest(data) {
        try {
            return axiosInstance.post('/start-thunder-test', data);
        } catch (error) {
            return error;
        }
    }

    async verifyThunderTest(testId, data) {
        try {
            return axiosInstance.post(`/thunder-test/${testId}/verify`, data);
        } catch (error) {
            return error;
        }
    }
}

export default new ThunderTestService();
