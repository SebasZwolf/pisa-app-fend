import axiosInstance from "@/utils/axiosInstance";

class ReportService {
    async getReportsByStudentId(studentId) {
        try {
            return axiosInstance.get(`/reports/students/${studentId}`);
        } catch (error) {
            return error;
        }
    }

    async getGeneralReportByStudentIdAndAreaId(studentId, areaId) {
        try {
            return axiosInstance.get(`/reports/areas/${areaId}/students/${studentId}`);
        } catch (error) {
            return error;
        }
    }
}

export default new ReportService();
