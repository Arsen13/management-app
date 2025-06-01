import axios from "axios";
import { getItem } from "../lib/localStorage.helper";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4200/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
