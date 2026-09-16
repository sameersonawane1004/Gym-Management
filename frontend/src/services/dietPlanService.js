import axios from "axios";

const API_URL = "http://localhost:5000/api/diet-plans";

export const generateDietPlan = async (dietData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/generate`,
      dietData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to generate diet plan",
      {
        cause: error,
      }
    );
  }
};

export const getMyDietPlans = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/my-plans`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diet plans",
      {
        cause: error,
      }
    );
  }
};

export const deleteDietPlan = async (dietPlanId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/${dietPlanId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete diet plan",
      {
        cause: error,
      }
    );
  }
};