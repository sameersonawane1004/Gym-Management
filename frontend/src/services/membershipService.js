import axios  from "axios";
import { getToken } from "../utils/token";
const API_URL="http://localhost:5000/api/memberships";

export const getMyMembership=async ()=>{
    try{
        const token =getToken();

        const response=await axios.get(
            `${API_URL}/my-memberships`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch membership",{
                cause:error,
            }
        );
    }
};

export const addMembership=async(planId)=>{
    try{
        const token =getToken();

        const response=await axios.post(
            `${API_URL}/add`,{
                planId,
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to add membership",
            {
                cause:error,
            }
        );
    }
}