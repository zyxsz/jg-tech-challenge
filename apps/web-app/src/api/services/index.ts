import axios from "axios";
import { AuthService } from "./auth.service";
import { userStore } from "@/stores/user.store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Get token dynamically

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return;

  if (userStore.getState().isRefreshingToken) {
    return new Promise((resolve) => setTimeout(() => resolve, 600));
  }

  userStore.setState({ isRefreshingToken: true });

  const newTokens = await AuthService.refreshToken({ refreshToken });

  localStorage.setItem("accessToken", newTokens.accessToken);
  localStorage.setItem("refreshToken", newTokens.refreshToken);

  api.defaults.headers["Authorization"] = `Bearer ${newTokens.accessToken}`;

  userStore.setState({ isRefreshingToken: false });

  return newTokens.accessToken;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.status === 401) {
      const newToken = await refreshToken();
      if (!newToken) return error;

      const config = error.config;

      config.headers["Authorization"] = api.defaults.headers["Authorization"];

      return api(config);
    }

    return error;
  }
);
