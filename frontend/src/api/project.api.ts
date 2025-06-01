import { AxiosError } from "axios";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";
import type { CreateProjectT, UpdateProjectT } from "../lib/types";

export async function getProjects() {
  try {
    const response = await axiosInstance.get("project");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else {
      console.error(error);
    }
  }
}

export async function createProject(data: CreateProjectT) {
  const response = await axiosInstance.post("project", data);
  return response.data;
}

export async function updateProject(data: UpdateProjectT) {
  const { id, ...updateData } = data;
  const response = await axiosInstance.put(`/project/${id}`, updateData);
  return response.data;
}

export async function deleteProject(projectId: number) {
  const response = await axiosInstance.delete(`/project/${projectId}`);
  return response.data;
}

export async function findOne(projectId: string) {
  try {
    const response = await axiosInstance.get(`/project/${projectId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    } else {
      toast.error("Internal server error");
    }
  }
}
