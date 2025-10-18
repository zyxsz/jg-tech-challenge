import { AuthService } from "@/api/services/auth.service";
import { Spinner } from "@/components/ui/spinner";
import { authStore } from "@/stores/auth.store";
import { webSocketStore } from "@/stores/websocket.store";
import { Outlet } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";

export const RootLayout = () => {
  const isLoading = authStore((state) => state.isLoading);

  useEffect(() => {
    async function loadAuthenticatedUser() {
      const user = await AuthService.getAuthenticatedUser().catch(() => null);

      authStore.setState({
        isLoading: false,
        isAuthenticated: !!user,
        user,
      });

      webSocketStore.getState().init();
    }

    loadAuthenticatedUser();
  }, []);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
