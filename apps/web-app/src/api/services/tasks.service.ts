import { api } from ".";
import type { GetTasksWithPaginationResponse } from "../interfaces/http/tasks/get-tasks-with-pagination.interface";

export class TasksService {
  static getTasksWithPagination(page: number, limit: number) {
    return api
      .get<GetTasksWithPaginationResponse>("/tasks", {
        params: { page, limitPerPage: limit },
      })
      .then((response) => response.data);
  }
}
