import axios from "axios";

const API_URL="http://localhost:5000/api/admin/members";

export const getAllMembers=async()=>{
    try{
        const token=localStorage.getItem("token");

        const response=await axios.get(API_URL,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch members",
            {
                cause:error,
            }
        );
    }
};


export const getMemberById=async(memberId)=>{
    try{
        const token=localStorage.getItem("token");

        const response=await axios.get(`${API_URL}/${memberId}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch member details",
            {
                cause:error,
            }
        );
    }
};

export const deleteMember=async(memberId)=>{
    try{
        const token=localStorage.getItem("token");

        const response=await axios.delete(`${API_URL}/${memberId}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to delete member",
            {
                cause:error,
            }
        );
    }
};