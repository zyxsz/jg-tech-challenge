import type { TasksServiceTypes } from "@repo/microservices";
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Length,
} from "class-validator";

enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

type Data = TasksServiceTypes.UpdateTaskInput["data"];

export class UpdateTaskData implements Data {
  @IsOptional()
  @Length(4, 128)
  title: string;

  @IsOptional()
  @Length(2, 256)
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TasksServiceTypes.TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TasksServiceTypes.TaskStatus;

  @IsOptional()
  term?: Date;
}

export class UpdateTaskDto implements TasksServiceTypes.UpdateTaskInput {
  @IsNotEmpty()
  taskId: string;

  @IsNotEmptyObject()
  data: UpdateTaskData;
}
