import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@ApiSchema({ name: "GetAssignmentsParamsDTO" })
export class GetAssignmentParamsDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: "Id da tarefa",
  })
  taskId: string;
}
