import { authStore } from "@/stores/auth.store";
import { Navigate, Outlet } from "@tanstack/react-router";
import { toast } from "sonner";

let isToastSended = false;
const sendToastMessage = () => {
  if (isToastSended) return;
  isToastSended = true;
  toast.error("Você já está autenticado, redirecionando...");
};

export const PublicLayout = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    sendToastMessage();

    return <Navigate to="/" />;
  }

  return <Outlet />;
};
