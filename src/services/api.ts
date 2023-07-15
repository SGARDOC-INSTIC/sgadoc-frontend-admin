import axios, { AxiosRequestConfig } from "axios";
//import { useCookies } from "@react-smart/react-cookie-service";

export const api = axios.create({
  baseURL: "https://marciomkt.com.br/api/backnath",
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // const { getCookie } = useCookies();
    //const token = getCookie("mundo-nathy");
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjo3LCJkc19ub21lIjoiRGlsbGVyIExhcmEiLCJleHAiOjE2NzI1NjE1MjV9.SpxxVEuOR0Z_zsq76yGhof3GhUBRxuHUM1TpghLFXlM";
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
