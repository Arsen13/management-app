import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

export async function findUsers() {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else {
      toast.error(String(error));
    }
  }
}
