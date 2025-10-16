import { Skeleton } from "@/components/ui/skeleton";

export const AssignmentsSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="bg-card rounded-md border p-2 flex items-center justify-between gap-4">
        <header className="flex items-center gap-2">
          <figure>
            <Skeleton className="size-10 bg-background rounded-full" />
          </figure>

          <Skeleton
            className="bg-background"
            style={{ width: 100, height: 24 }}
          />
        </header>

        <Skeleton
          className="bg-background"
          style={{ width: 168, height: 16 }}
        />
      </div>
      <div className="bg-card rounded-md border p-2 flex items-center justify-between gap-4">
        <header className="flex items-center gap-2">
          <figure>
            <Skeleton className="size-10 bg-background rounded-full" />
          </figure>

          <Skeleton
            className="bg-background"
            style={{ width: 100, height: 24 }}
          />
        </header>

        <Skeleton
          className="bg-background"
          style={{ width: 168, height: 16 }}
        />
      </div>
    </div>
  );
};
