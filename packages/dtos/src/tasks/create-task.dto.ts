import { IsEnum, IsNotEmpty, Length, MinLength } from "class-validator";
import { TaskPriority, TaskStatus } from "./enums";
import { type TasksServiceTypes } from "../types/tasks-service.types";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

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
    @ApiSchema({
      name: "CreateTaskBodyDTO",
    })
    export class Body {
      @IsNotEmpty()
      @Length(4, 128)
      @ApiProperty({
        description: "Título da tarefa",
        minLength: 4,
        maxLength: 128,
      })
      title: string;

      @IsNotEmpty()
      @MinLength(2)
      @ApiProperty({
        description: "Descrição da tarefa",
        minLength: 2,
      })
      description: string;

      @IsNotEmpty()
      @IsEnum(TaskPriority)
      @ApiProperty({
        description: "Prioridade da tarefa",

        enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      })
      priority: TasksServiceTypes.TaskPriority;

      @IsNotEmpty()
      @IsEnum(TaskStatus)
      @ApiProperty({
        description: "Status da tarefa",

        enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
      })
      status: TasksServiceTypes.TaskStatus;

      @IsNotEmpty()
      @ApiProperty({
        description: "Prazo para entrega da tarefa",
        type: "string",
      })
      term: Date;
    }
  }

  export namespace Microservice {
    export class Payload extends CreateTaskDTOInput {}
  }
}
