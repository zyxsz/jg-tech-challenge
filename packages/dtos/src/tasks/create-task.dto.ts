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

class CreateTaskDTOInput implements TasksServiceTypes.CreateTaskInput {
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

export namespace CreateTaskDTO {
  export namespace Http {
    export class Body {
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
  }

  export namespace Microservice {
    export class Payload extends CreateTaskDTOInput {}
  }
}
