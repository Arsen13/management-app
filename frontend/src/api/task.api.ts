import { AxiosError } from "axios";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";

export async function getTasks(taskId: string) {
  try {
    const response = await axiosInstance.get(`/task/${taskId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else {
      console.error(error);
    }
  }
}
