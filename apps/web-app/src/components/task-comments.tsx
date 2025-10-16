import { TasksService } from "@/api/services/tasks.service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { distanceToNow } from "@/lib/date";
import { parseISO } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  ChevronDownIcon,
  MessageCirclePlus,
  MessageCirclePlusIcon,
} from "lucide-react";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { TaskCommentButton } from "./task-comment-button";

interface Props {
  taskId: string;
}

export const TaskComments = ({ taskId }: Props) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(5));

  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", taskId, "comments"],
    queryFn: () =>
      TasksService.getTaskCommentsWithPagination(taskId, page, limit),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!comments) return null;

  const hasBefore = (comments?.pagination.page || 0) > 1;
  const hasNext =
    (comments?.pagination.totalPages || 0) > (comments?.pagination.page || 0);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleNextPage = () => {
    if (!comments?.pagination) return;
    if (comments.pagination.page >= comments.pagination.totalPages) return;

    setPage((state) => state + 1);
  };

  const handlePrevPage = () => {
    if (!comments?.pagination) return;
    if (comments.pagination.page <= 1) return;

    setPage((state) => state - 1);
  };

  const handleRefetch = async () => {
    await refetch();
  };

  if (!comments.data.length) {
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
        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={!hasBefore}
                onClick={() => handlePrevPage()}
              />
            </PaginationItem>
            {hasBefore && (
              <PaginationItem>
                <PaginationButton
                  onClick={() => handleChangePage(comments.pagination.page - 1)}
                >
                  {comments.pagination.page - 1}
                </PaginationButton>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationButton isActive>
                {comments.pagination.page}
              </PaginationButton>
            </PaginationItem>
            {hasNext && (
              <PaginationItem>
                <PaginationButton
                  onClick={() => handleChangePage(comments.pagination.page + 1)}
                >
                  {comments.pagination.page + 1}
                </PaginationButton>
              </PaginationItem>
            )}

            <PaginationNext
              disabled={!hasNext}
              onClick={() => handleNextPage()}
            />
          </PaginationContent>
        </Pagination>
      </footer>
    </div>
  );
};
