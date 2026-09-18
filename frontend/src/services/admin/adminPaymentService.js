import axios from "axios";
import { getToken } from "../../utils/token";

const API_URL = "http://localhost:5000/api/admin/payments";

// Get all payments for admin
export const getAllPayments = async () => {
    try {
        const token = getToken();

        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Failed to fetch payments",
            { cause: error }
        );
    }
};