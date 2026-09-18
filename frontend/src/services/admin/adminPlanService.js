import axios from "axios";
import { getToken } from "../../utils/token";

const API_URL ="http://localhost:5000/api/membership-plans";

export const getAllAdminMembershipPlans =async()=>{
    try{
        const token=getToken();
        const response=await axios.get(`${API_URL}/admin`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message ||
            "Failed to fetch membership plans",
            {
                cause:error
            }
        );
    }
};

//create membership plan
export const createMembershipPlan=async(planData)=>{
    try{
        const token =getToken();
        const response=await axios.post(
            `${API_URL}/create`,
            planData,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message ||
            "Failed to create membership plan",
            {
                cause:error
            }
        );
    }
};

// Update membership plan
export const updateMembershipPlan = async (id, planData) => {
    try {
        const token = getToken();

        const response = await axios.put(
            `${API_URL}/update/${id}`,
            planData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Failed to update membership plan",
            { cause: error }
        );
    }
};

// Delete membership plan
export const deleteMembershipPlan = async (id) => {
    try {
        const token = getToken();

        const response = await axios.delete(
            `${API_URL}/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Failed to delete membership plan",
            { cause: error }
        );
    }
};