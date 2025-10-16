import type { User } from "@/api/interfaces/user.entity";
import { create } from "zustand";

export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean | null;
  isRefreshingToken: boolean;
}

export const authStore = create<AuthStore>(() => ({
  isRefreshingToken: false,
  isLoading: true,
  isAuthenticated: null,
  user: null,
}));
