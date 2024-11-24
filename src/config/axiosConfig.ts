import axios from "axios";
import { envs } from "@/utils";
import { useAuthStore } from "@/store/useAuthStore";
import qs from "querystring";

const baseURL = envs.SERVER_URL;

const validateStatus = (status: number) => {
	if (status === 401) {
		logout();
	}
	return status >= 200 && status < 300;
};

const axiosInst = axios.create({
	baseURL,
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
	useAuthStore.getState().resetCreds();
	window.location.reload();
};

export { axiosInst, baseURL, logout };
