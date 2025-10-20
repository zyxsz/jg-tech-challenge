import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
} from "class-validator";
import { TaskEntity } from "../entities/task.entity";
import { TaskPriority, TaskStatus } from "../entities/enums";

class UpdateTaskData {
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
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: "Status da tarefa",

    enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
    required: false,
  })
  status?: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

  @IsOptional()
  @ApiProperty({
    description: "Prazo para entrega da tarefa",
    type: "string",
    required: false,
  })
  term?: Date;
}

export class UpdateTaskMessageInput {
  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  authorId: string;

  data: UpdateTaskData;
}

export class UpdateTaskMessageOutput {
  task: TaskEntity;
}
