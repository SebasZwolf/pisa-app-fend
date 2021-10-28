import axiosInstance from "@/utils/axiosInstance";

class LocationService {
    async getRegions() {
        try {
            return axiosInstance.get('/regions');
        } catch (error) {
            return error;
        }
    }

    async getProvinces(regionId) {
        try {
            return axiosInstance.get(`/regions/${regionId}/provinces`);
        } catch (error) {
            return error;
        }
    }

    async getDistricts(provinceId) {
        try {
            return axiosInstance.get(`/provinces/${provinceId}/districts`);
        } catch (error) {
            return error;
        }
    }
}

export default new LocationService();