import { CommentEntity } from "../entities/comment.entity";
import { TaskEntity } from "../entities/task.entity";

export class TaskCommentCreatedEvent {
  constructor(
    public task: TaskEntity,
    public comment: CommentEntity,
    public targetId: string,
  ) {}
}
