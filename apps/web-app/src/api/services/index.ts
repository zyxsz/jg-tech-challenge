import axios, { AxiosError, type AxiosInstance } from "axios";
import { AuthService } from "./auth.service";
import { authStore } from "@/stores/auth.store";
import { toast } from "sonner";

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

  if (authStore.getState().isRefreshingToken) {
    return new Promise((resolve) => setTimeout(() => resolve, 600));
  }

  authStore.setState({ isRefreshingToken: true });

  const newTokens = await AuthService.refreshToken({ refreshToken });

  localStorage.setItem("accessToken", newTokens.accessToken);
  localStorage.setItem("refreshToken", newTokens.refreshToken);

  api.defaults.headers["Authorization"] = `Bearer ${newTokens.accessToken}`;

  authStore.setState({ isRefreshingToken: false });

  return newTokens.accessToken;
}

api.interceptors.response.use(
  (response) => response,
  async (originalRequest) => {
    if (
      originalRequest.response.status === 401 &&
      !originalRequest.request.responseURL.endsWith("refresh")
    ) {
      try {
        await refreshToken();

        const config = originalRequest.config;
        config.headers["Authorization"] = api.defaults.headers["Authorization"];

        return api(config);
      } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.message ||
            error?.message ||
            "Não foi possível atualizar seu token de acesso.";

          toast.error(message);
        }

        return Promise.reject(originalRequest);
      }
    }

    return Promise.reject(originalRequest);
  }
);
