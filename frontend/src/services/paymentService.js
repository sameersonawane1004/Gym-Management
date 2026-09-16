import axios from "axios";


const API_URL="http://localhost:5000/api/payments";

export const createPaymentOrder=async(planId,token)=>{
    try{
        const response=await axios.post(
            `${API_URL}/create-order`,
            {planId},
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to create payment order",
            {
                cause:error,
            }
        );
    }
};

export const verifyPayment=async(paymentData,token)=>{
    try{
        const response=await axios.post(
            `${API_URL}/verify`,
            paymentData,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Payment verfication failed",
            {
                cause:error,
            }
        );
    }
};

export const getMyPayments = async (token) => {
    try {
        const response = await axios.get(
            `${API_URL}/my-payments`,
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
            "Failed to fetch payment history",
            {
                cause: error,
            }
        );
    }
};