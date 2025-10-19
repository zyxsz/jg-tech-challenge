import { TaskEntity } from "../entities/task.entity";

export class TaskCreatedEvent {
  public task: TaskEntity;

  constructor(task: TaskEntity) {
    this.task = task;
  }
}
