import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export const TaskDetailsSkeleton = () => {
  return (
    <div className="space-y-4">
      <header>
        <Button
          variant="link"
          color="muted"
          className="font-normal px-0!"
          asChild
        >
          <Link to="/tasks">
            <ArrowLeftIcon />
            Voltar
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-6 max-sm:gap-2 max-sm:flex-col max-sm:items-start">
          <div className="flex items-end gap-2">
            <Skeleton style={{ width: 260, height: 40 }} />

            <Skeleton
              className="ml-2 max-sm:hidden"
              style={{ width: 130, height: 34 }}
            />
            <Skeleton
              className="max-sm:hidden"
              style={{ width: 100, height: 34 }}
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Skeleton style={{ width: 100, height: 34 }} />

            <Skeleton style={{ width: 34, height: 34 }} />
            <Skeleton style={{ width: 34, height: 34 }} />
          </div>
        </div>
      </header>

      <div className="bg-card rounded-md border p-4 text-muted-foreground markdown space-y-2">
        <Skeleton
          className="bg-background"
          style={{ width: 128, height: 16 }}
        />
        <Skeleton
          className="bg-background"
          style={{ width: 256, height: 16 }}
        />
        <Skeleton className="bg-background" style={{ width: 32, height: 16 }} />
        <Skeleton className="bg-background" style={{ width: 64, height: 16 }} />
        <Skeleton
          className="bg-background"
          style={{ width: 128, height: 16 }}
        />
        <Skeleton
          className="bg-background"
          style={{ width: 256, height: 16 }}
        />
        <Skeleton className="bg-background" style={{ width: 64, height: 16 }} />
        <Skeleton className="bg-background" style={{ width: 32, height: 16 }} />
        <Skeleton
          className="bg-background"
          style={{ width: 128, height: 16 }}
        />
        <Skeleton className="bg-background" style={{ width: 32, height: 16 }} />
        <Skeleton
          className="bg-background"
          style={{ width: 256, height: 16 }}
        />
        <Skeleton className="bg-background" style={{ width: 64, height: 16 }} />
      </div>
    </div>
  );
};
