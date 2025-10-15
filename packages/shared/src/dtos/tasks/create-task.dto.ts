import type { TasksServiceTypes } from "@repo/microservices";
import {
  IsEnum,
  IsNotEmpty,
  Length,
  Max,
  Min,
  MinLength,
} from "class-validator";
import { TaskPriority, TaskStatus } from "./enums";

export class CreateTaskDto implements TasksServiceTypes.CreateTaskInput {
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
  priority: TasksServiceTypes.TaskPriority;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TasksServiceTypes.TaskStatus;

  @IsNotEmpty()
  term: Date;
}

export class CreateTaskBodyDto {
  @IsNotEmpty()
  @Length(4, 128)
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TasksServiceTypes.TaskPriority;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TasksServiceTypes.TaskStatus;

  @IsNotEmpty()
  term: Date;
}
