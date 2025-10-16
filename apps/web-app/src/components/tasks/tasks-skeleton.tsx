import { Skeleton } from "../ui/skeleton";

export const TasksSkeleton = () => {
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-6">
        <div className="space-y-1">
          <Skeleton style={{ width: 235, height: 40 }} />
          <Skeleton style={{ width: 350, height: 20 }} />
        </div>
        <Skeleton style={{ width: 150, height: 36 }} />
      </header>

      <div className="space-y-2">
        <div className="p-4 border rounded-md bg-card">
          <header className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton
                  className="bg-background"
                  style={{ width: 100, height: 28 }}
                />
                <Skeleton
                  className="bg-background"
                  style={{ width: 34, height: 34 }}
                />
              </div>
              <Skeleton
                className="bg-background"
                style={{ width: "100%", height: 20 }}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 126, height: 36 }}
              />
            </div>
          </header>

          <footer className="mt-2">
            <div className="flex items-center gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 128, height: 34 }}
              />

              <Skeleton
                className="bg-background"
                style={{ width: 100, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 87, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 34, height: 34 }}
              />
            </div>
          </footer>
        </div>
        <div className="p-4 border rounded-md bg-card">
          <header className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton
                  className="bg-background"
                  style={{ width: 100, height: 28 }}
                />
                <Skeleton
                  className="bg-background"
                  style={{ width: 34, height: 34 }}
                />
              </div>
              <Skeleton
                className="bg-background"
                style={{ width: "100%", height: 20 }}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 126, height: 36 }}
              />
            </div>
          </header>

          <footer className="mt-2">
            <div className="flex items-center gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 128, height: 34 }}
              />

              <Skeleton
                className="bg-background"
                style={{ width: 100, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 87, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 34, height: 34 }}
              />
            </div>
          </footer>
        </div>
        <div className="p-4 border rounded-md bg-card">
          <header className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton
                  className="bg-background"
                  style={{ width: 100, height: 28 }}
                />
                <Skeleton
                  className="bg-background"
                  style={{ width: 34, height: 34 }}
                />
              </div>
              <Skeleton
                className="bg-background"
                style={{ width: "100%", height: 20 }}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 126, height: 36 }}
              />
            </div>
          </header>

          <footer className="mt-2">
            <div className="flex items-center gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 128, height: 34 }}
              />

              <Skeleton
                className="bg-background"
                style={{ width: 100, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 87, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 34, height: 34 }}
              />
            </div>
          </footer>
        </div>
        <div className="p-4 border rounded-md bg-card">
          <header className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton
                  className="bg-background"
                  style={{ width: 100, height: 28 }}
                />
                <Skeleton
                  className="bg-background"
                  style={{ width: 34, height: 34 }}
                />
              </div>
              <Skeleton
                className="bg-background"
                style={{ width: "100%", height: 20 }}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 126, height: 36 }}
              />
            </div>
          </header>

          <footer className="mt-2">
            <div className="flex items-center gap-2">
              <Skeleton
                className="bg-background"
                style={{ width: 128, height: 34 }}
              />

              <Skeleton
                className="bg-background"
                style={{ width: 100, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 87, height: 34 }}
              />
              <Skeleton
                className="bg-background"
                style={{ width: 34, height: 34 }}
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
