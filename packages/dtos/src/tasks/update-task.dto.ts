import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { type TasksServiceTypes } from "../types/tasks-service.types";

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
  @ApiProperty({
    description: "Título da tarefa",
    minLength: 4,
    maxLength: 128,
    required: false,
  })
  title: string;

  @IsOptional()
  @MinLength(2)
  @ApiProperty({
    description: "Descrição da tarefa",
    minLength: 2,
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  @ApiProperty({
    description: "Prioridade da tarefa",

    enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
    required: false,
  })
  priority?: TasksServiceTypes.TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: "Status da tarefa",

    enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
    required: false,
  })
  status?: TasksServiceTypes.TaskStatus;

  @IsOptional()
  @ApiProperty({
    description: "Prazo para entrega da tarefa",
    type: "string",
    required: false,
  })
  term?: Date;
}

export namespace UpdateTaskDTO {
  export namespace Http {
    @ApiSchema({ name: "UpdateTaskParamsDTO" })
    export class Params {
      @IsNotEmpty()
      @ApiProperty({
        description: "Id da tarefa",
      })
      taskId: string;
    }

    @ApiSchema({ name: "UpdateTaskBodyDTO" })
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
