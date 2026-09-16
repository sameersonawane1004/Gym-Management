import axios from "axios";

const API_URL="http://localhost:5000/api/user";

export const getProfile=async(token)=>{
    try{
        const response=await axios.get(
            `${API_URL}/profile`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch profile",
            {
                cause:error,
            }
        );
    }
};

export const updateProfile = async (name, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/profile`,
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            "Failed to update profile",
            {
                cause: error,
            }
        );
    }
};