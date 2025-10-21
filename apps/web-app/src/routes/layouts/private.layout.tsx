import { Navbar } from "@/components/navbar";
import { authStore } from "@/stores/auth.store";
import { Navigate, Outlet } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

export const PrivateLayout = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    toast.error(
      "Você deve se autenticar primeiro para acessar essa página, redirecionando..."
    );

    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      <Navbar />
      <div className="mt-20 max-w-screen-lg mx-auto px-4 py-4 pb-20">
        <Outlet />
      </div>
    </Fragment>
  );
};
