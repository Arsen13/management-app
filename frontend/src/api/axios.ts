import axios from "axios";
import { getItem } from "../lib/localStorage.helper";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    Authorization: `Bearer ${getItem("token")}` || "",
  },
});
