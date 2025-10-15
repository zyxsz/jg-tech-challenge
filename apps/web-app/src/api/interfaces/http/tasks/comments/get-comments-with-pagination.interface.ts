import type { Pagination } from "@/api/interfaces/pagination.interface";
import type { TaskComment } from "@/api/interfaces/task-comment.entity";

export interface GetCommentsWithPaginationResponse
  extends Pagination<TaskComment> {}
