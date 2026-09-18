import axios from "axios";
import { getToken } from "../../utils/token";

const API_URL ="http://localhost:5000/api/memberships";

export const getAllMemberships=async () =>{
    try{
        const token=getToken();

        const response=await axios.get(`${API_URL}/admin/all`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch memberships",
            {
                cause:error
            }
        );
    }
};