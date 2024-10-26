import axios from "axios";
import { envs } from "@/utils";
import { useAuthStore } from "@/store/useAuthStore";
import qs from "querystring";

const { VITE_API_URL: baseURL } = envs;

const validateStatus = (status: number) => {
  if (status === 401) {
    logout();
  }
  return status >= 200 && status < 300;
};

const axiosInst = axios.create({
  baseURL: "http://192.168.29.57:3000",
  timeout: 50_000,
  validateStatus,
  paramsSerializer: (params) => qs.stringify(params),
});

axiosInst.interceptors.request.use((config) => {
  const token = useAuthStore.getState().creds.token;
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return { ...config };
});

axiosInst.interceptors.response.use(
  (config) => config.data,
  (errResp) => Promise.reject(errResp.response.data),
);

const logout = () => {
  console.log("logout Called axiosConfig.ts:31");
  useAuthStore.getState().resetCreds();
  window.location.reload();
};

export { axiosInst, baseURL, logout };
