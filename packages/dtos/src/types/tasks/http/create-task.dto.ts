import { IsEnum, IsNotEmpty, Length, MinLength } from "class-validator";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { TaskPriority, TaskStatus } from "../entities/enums";

@ApiSchema({
  name: "CreateTaskBodyDTO",
})
export class CreateTaskBodyDTO {
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
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: "Status da tarefa",

    enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
  })
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

  @IsNotEmpty()
  @ApiProperty({
    description: "Prazo para entrega da tarefa",
    type: "string",
  })
  term: Date;
}
