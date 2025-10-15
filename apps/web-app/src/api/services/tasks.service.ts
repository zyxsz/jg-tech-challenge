import { api } from ".";
import type { GetCommentsWithPaginationResponse } from "../interfaces/http/tasks/comments/get-comments-with-pagination.interface";
import type { CreateTaskBody } from "../interfaces/http/tasks/create-task.interface";
import type { GetTaskResponse } from "../interfaces/http/tasks/get-task.interface";
import type { GetTasksWithPaginationResponse } from "../interfaces/http/tasks/get-tasks-with-pagination.interface";
import type { UpdateTaskBody } from "../interfaces/http/tasks/update-task.interface";

export class TasksService {
  static async getTasksWithPagination(page: number, limit: number) {
    return api
      .get<GetTasksWithPaginationResponse>("/tasks", {
        params: { page, limitPerPage: limit },
      })
      .then((response) => response.data);
  }

  static async getTask(id: string) {
    return api
      .get<GetTaskResponse>(`/tasks/${id}`)
      .then((response) => response.data);
  }

  static async create(body: CreateTaskBody) {
    return api.post<void>("/tasks", body).then((response) => response.data);
  }

  static async update(id: string, body: UpdateTaskBody) {
    return api
      .put<void>(`/tasks/${id}`, body)
      .then((response) => response.data);
  }

  static async delete(id: string) {
    return api.delete<void>(`/tasks/${id}`).then((response) => response.data);
  }

  // Comments

  static async getTaskCommentsWithPagination(
    id: string,
    page: number,
    limit: number
  ) {
    return api
      .get<GetCommentsWithPaginationResponse>(`/tasks/${id}/comments`, {
        params: { page, limitPerPage: limit },
      })
      .then((response) => response.data);
  }
}
