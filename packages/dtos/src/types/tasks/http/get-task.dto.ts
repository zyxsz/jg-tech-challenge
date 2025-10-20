import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@ApiSchema({
  name: "GetTaskDTOParams",
})
export class GetTaskQueryParamsDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: "Id da tarefa",
  })
  taskId: string;
}
