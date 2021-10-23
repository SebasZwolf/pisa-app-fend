import axiosInstance from "../utils/axiosInstance";

class LocationService {
    async getRegions() {
        try {
            const response = axiosInstance.get('/regions');
            return response;
        } catch (error) {
            return null;
        }
    }
}

export default new LocationService();