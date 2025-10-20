import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@ApiSchema({ name: "DeleteTaskParamsDTO" })
export class DeleteTaskParamsDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: "Id da tarefa",
  })
  taskId: string;
}
