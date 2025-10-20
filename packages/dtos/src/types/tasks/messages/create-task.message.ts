import { IsEnum, IsNotEmpty, Length, MinLength } from "class-validator";
import { TaskEntity } from "../entities/task.entity";
import { TaskPriority, TaskStatus } from "../entities/enums";

export class CreateTaskMessageInput {
  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  @Length(4, 128)
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

  @IsNotEmpty()
  term: Date;
}

export class CreateTaskMessageOutput {
  task: TaskEntity;

  constructor(data: { task: TaskEntity }) {
    this.task = data.task;
  }
}
