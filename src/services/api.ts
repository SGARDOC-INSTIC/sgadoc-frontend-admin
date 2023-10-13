import { useCookies } from "@react-smart/react-cookie-service";
import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://sgardoc-instic-api.vercel.app",
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const { getCookie } = useCookies();
    const token = getCookie("sgardoc-instic");
    if (token) {
      (config.headers ??= {}).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default api;
