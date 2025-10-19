import { TaskEntity } from "../entities/task.entity";

export class TaskUpdatedEvent {
  public outdatedTask: TaskEntity;
  public updatedTask: TaskEntity;

  constructor(updatedTask: TaskEntity, outdatedTask: TaskEntity) {
    this.outdatedTask = outdatedTask;
    this.updatedTask = updatedTask;
  }
}
