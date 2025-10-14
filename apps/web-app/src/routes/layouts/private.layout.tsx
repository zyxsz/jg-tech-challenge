import { Navbar } from "@/components/navbar";
import { userStore } from "@/stores/user.store";
import { Navigate, Outlet } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const PrivateLayout = () => {
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      <Navbar />
      <div className="mt-20 max-w-screen-lg mx-auto px-2 py-4">
        <Outlet />
      </div>
    </Fragment>
  );
};
