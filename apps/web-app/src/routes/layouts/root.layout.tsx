import { AuthService } from "@/api/services/auth.service";
import { userStore } from "@/stores/user.store";
import { Outlet } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";

export const RootLayout = () => {
  const isLoading = userStore((state) => state.isLoading);

  useEffect(() => {
    async function loadAuthenticatedUser() {
      const user = await AuthService.getAuthenticatedUser().catch(() => null);

      userStore.setState({
        isLoading: false,
        isAuthenticated: !!user,
        user,
      });
    }

    loadAuthenticatedUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
