import type { TasksServiceTypes } from "@repo/microservices";
import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Length,
  MinLength,
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

class UpdateTaskBodyDataInput implements Data {
  @IsOptional()
  @Length(4, 128)
  title: string;

  @IsOptional()
  @MinLength(2)
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

export namespace UpdateTaskDTO {
  export namespace Http {
    export class Params {
      @IsNotEmpty()
      taskId: string;
    }

    export class Body extends UpdateTaskBodyDataInput {}
  }

  export namespace Microservice {
    export class Payload implements TasksServiceTypes.UpdateTaskInput {
      @IsNotEmpty()
      taskId: string;

      @IsNotEmpty()
      authorId: string;

      data: UpdateTaskBodyDataInput;
    }
  }
}
