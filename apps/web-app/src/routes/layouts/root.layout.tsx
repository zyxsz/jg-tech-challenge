import { Spinner } from "@/components/ui/spinner";
import { authStore } from "@/stores/auth.store";
import { Outlet } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";

export const RootLayout = () => {
  const isLoading = authStore((state) => state.isLoading);
  const init = authStore((state) => state.init);

  useEffect(() => {
    init();
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
