import { userStore } from "@/stores/user.store";
import { Navigate, Outlet } from "@tanstack/react-router";

export const PublicLayout = () => {
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
