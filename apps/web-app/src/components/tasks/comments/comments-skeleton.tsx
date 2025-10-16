import { Skeleton } from "@/components/ui/skeleton";

export const TaskCommentsSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="bg-card p-2 rounded-md border">
        <header className="flex items-center gap-2">
          <figure>
            <Skeleton className="bg-background size-12 rounded-full" />
          </figure>
          <div className="space-y-1">
            <Skeleton
              className="bg-background"
              style={{ width: 100, height: 24 }}
            />
            <Skeleton
              className="bg-background"
              style={{ width: 168, height: 16 }}
            />
          </div>
        </header>

        <div className="mt-2 pl-14 text-muted-foreground text-sm space-y-1">
          <Skeleton
            className="bg-background"
            style={{ width: "100%", height: 16 }}
          />
          <Skeleton
            className="bg-background"
            style={{ width: "33%", height: 16 }}
          />
        </div>
      </div>
      <div className="bg-card p-2 rounded-md border">
        <header className="flex items-center gap-2">
          <figure>
            <Skeleton className="bg-background size-12 rounded-full" />
          </figure>
          <div className="space-y-1">
            <Skeleton
              className="bg-background"
              style={{ width: 100, height: 24 }}
            />
            <Skeleton
              className="bg-background"
              style={{ width: 168, height: 16 }}
            />
          </div>
        </header>

        <div className="mt-2 pl-14 text-muted-foreground text-sm space-y-1">
          <Skeleton
            className="bg-background"
            style={{ width: "95%", height: 16 }}
          />
          <Skeleton
            className="bg-background"
            style={{ width: "66%", height: 16 }}
          />
          <Skeleton
            className="bg-background"
            style={{ width: "10%", height: 16 }}
          />
        </div>
      </div>
    </div>
  );
};
