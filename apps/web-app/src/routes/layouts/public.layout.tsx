import { authStore } from "@/stores/auth.store";
import { Navigate, Outlet } from "@tanstack/react-router";
import { toast } from "sonner";

export const PublicLayout = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    toast.error("Você já está autenticado, redirecionando...");

    return <Navigate to="/" />;
  }

  return <Outlet />;
};
