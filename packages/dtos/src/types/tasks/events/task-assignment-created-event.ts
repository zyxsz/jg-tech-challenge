import { TaskEntity } from "../entities/task.entity";

export class TaskAssignmentCreatedEvent {
  public task: TaskEntity;
  public targetId: string;

  constructor(data: { task: TaskEntity; targetId: string }) {
    this.task = data.task;
    this.targetId = data.targetId;
  }
}
