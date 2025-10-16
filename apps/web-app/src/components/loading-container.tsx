import { Spinner } from "./ui/spinner";

export const LoadingContainer = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col py-12">
      <Spinner className="size-10" />
    </div>
  );
};
