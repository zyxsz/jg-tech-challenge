import type { Pagination } from "../../pagination.interface";
import type { Task } from "../../task.entity";

export interface GetTasksWithPaginationResponse extends Pagination<Task> {}
