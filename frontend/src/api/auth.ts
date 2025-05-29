import { AxiosError } from "axios";
import type { LoginFormField } from "../lib/types";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";
import { setItem } from "../lib/localStorage.helper";

export async function login(userData: LoginFormField) {
  try {
    const result = await axiosInstance.post("/auth/login", userData);
    const { token, ...user } = result.data;

    setItem("token", token);
    setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    }
  }
}
