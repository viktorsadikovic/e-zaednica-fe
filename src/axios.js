import axios from "axios";
import { clearAuthStorage, getSessionToken } from "./utils/auth";

export const basePath = "http://localhost:3000/api/v1";

const axiosClient = axios.create({
  baseURL: basePath,
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${getSessionToken()}`,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const hasUnauthorizedMessage =
      error.response?.data?.message?.includes("Unauthorized");

    if (error.response?.status === 401 && hasUnauthorizedMessage) {
      clearAuthStorage();
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const e = error?.response;

    if (e?.data) {
      const { message } = e.data;
      e.data.message = Array.isArray(message) ? message : [message];
      return Promise.reject(e.data);
    }

    return null;
  }
);

export const apiDefaultArgs = [
  {
    basePath,
    isJsonMime: () => false,
  },
  undefined,
  axiosClient,
];

export default axiosClient;
