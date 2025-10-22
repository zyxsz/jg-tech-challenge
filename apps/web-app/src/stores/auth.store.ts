import type { User } from "@/api/interfaces/user.entity";
import { AuthService } from "@/api/services/auth.service";
import { create } from "zustand";
import { webSocketStore } from "./websocket.store";

export interface AuthStore {
  user: User | null;
  isFetching: boolean;
  isLoading: boolean;
  isAuthenticated: boolean | null;
  isRefreshingToken: boolean;
  init: () => Promise<void>;
  logout: () => void;
}

export const authStore = create<AuthStore>((set, get) => ({
  isRefreshingToken: false,
  isFetching: false,
  isLoading: true,
  isAuthenticated: null,
  user: null,
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  init: async () => {
    if (get().isFetching) return;
    set({ isFetching: true });

    const user = await AuthService.getAuthenticatedUser().catch(() => null);

    if (!user) {
      authStore.setState({
        isLoading: false,
        isFetching: false,
        isAuthenticated: false,
        user: null,
      });

      return;
    }

    authStore.setState({
      isLoading: false,
      isFetching: false,
      isAuthenticated: true,
      user,
    });

    webSocketStore.getState().init();
  },
}));
