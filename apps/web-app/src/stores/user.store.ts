import type { User } from "@/api/interfaces/user.entity";
import { create } from "zustand";

export interface UserStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean | null;
  isRefreshingToken: boolean;
}

export const userStore = create<UserStore>(() => ({
  isRefreshingToken: false,
  isLoading: true,
  isAuthenticated: null,
  user: null,
}));
