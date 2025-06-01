import { AxiosError } from "axios";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";
import type {
  AssignUserT,
  ChangeStatusT,
  CreateTaskT,
  DeleteTaskT,
  UpdateTaskT,
} from "../lib/types";

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

export async function createTask(data: CreateTaskT) {
  const { projectId, ...createData } = data;
  const response = await axiosInstance.post(`/task/${projectId}`, createData);
  return response.data;
}

export async function updateTask(data: UpdateTaskT) {
  const { id: taskId, ...updateData } = data;
  const response = await axiosInstance.patch(`/task/${taskId}`, updateData);
  return response.data;
}

export async function changeStatus(data: ChangeStatusT) {
  const { currentStatus, taskId } = data;
  const status = currentStatus == "todo" ? "in_progress" : "done";
  const response = await axiosInstance.patch(`/task/status/${taskId}`, {
    status,
  });

  return response.data;
}

export async function assignUser(data: AssignUserT) {
  const { taskId, userId } = data;
  const response = await axiosInstance.patch(`/task/assign/${taskId}`, {
    id: userId,
  });
  return response.data;
}

export async function deleteTask(data: DeleteTaskT) {
  const { taskId, projectId } = data;
  const response = await axiosInstance.delete(`/task/${taskId}`);
  return { projectId, ...response.data };
}
