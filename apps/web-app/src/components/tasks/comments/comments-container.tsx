import { TasksService } from "@/api/services/tasks.service";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { distanceToNow } from "@/lib/date";
import { parseISO } from "date-fns";

import { TaskCommentButton } from "./comment-button";
import { TaskCommentsSkeleton } from "./comments-skeleton";
import { usePaginationHook } from "@/hooks/use-pagination.hook";
import { ErrorContainer } from "@/components/error-container";

interface Props {
  taskId: string;
}

export const TaskCommentsContainer = ({ taskId }: Props) => {
  const { page, limit, setPage, Components } = usePaginationHook();
  const {
    data: comments,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["tasks", taskId, "comments"],
    queryFn: () =>
      TasksService.getTaskCommentsWithPagination(taskId, page, limit),
  });

  if (isLoading) return <TaskCommentsSkeleton />;
  if (error) return <ErrorContainer message={error.message} />;
  if (!comments)
    return <ErrorContainer message={"Unable to fetch for comments"} />;

  const handleRefetch = async () => {
    await refetch();
  };

  if (comments.data.length <= 0) {
    if (page !== 1) {
      setPage(1);
    }

    return (
      <div>
        <h2 className="text-xl font-bold">Nenhum comentário encontrado</h2>
        <p className="text-sm text-muted-foreground">
          Clique no botão abaixo para deixar o primeiro comentário nessa tarefa!
        </p>
        <TaskCommentButton
          refetch={handleRefetch}
          className="mt-2"
          taskId={taskId}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {comments.data.map((comment) => (
          <div key={comment.id}>
            <div className="bg-card p-2 rounded-md border">
              {comment.relations?.author && (
                <header className="flex items-center gap-2">
                  <figure>
                    <Avatar className="size-12">
                      <AvatarImage
                        src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(comment.relations.author.username)}`}
                      />
                      <AvatarFallback>
                        {comment.relations.author.username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </figure>
                  <div>
                    <h1>{comment.relations.author.username}</h1>
                    <p className="text-xs text-muted-foreground">
                      {distanceToNow(parseISO(comment.createdAt))}
                    </p>
                  </div>
                </header>
              )}
              <div className="mt-2 pl-14 text-muted-foreground text-sm">
                <Markdown>{comment.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="mt-4 flex items-center justify-between gap-2 select-none">
        <TaskCommentButton refetch={handleRefetch} taskId={taskId} />
        <Components.PaginationComp paginationData={comments.pagination} />
      </footer>
    </div>
  );
};
