import { axiosInstance } from "../utils/axios";

export const authServices = {
  login: async (userAccount) => {
    try {
      const response = await axiosInstance.post("/auth/login", userAccount);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  signup: async (userAccount) => {
    try {
      const response = await axiosInstance.post("/auth/register", userAccount);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
};
