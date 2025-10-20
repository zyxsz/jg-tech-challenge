import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

@ApiSchema({
  name: "CreateCommentParamsDTO",
})
export class CreateCommentParamsDTO {
  @IsNotEmpty()
  @ApiProperty({
    description: "Id da tarefa",
  })
  taskId: string;
}

@ApiSchema({
  name: "CreateCommentBodyDTO",
})
export class CreateCommentBodyDTO {
  @IsNotEmpty()
  @Length(4, 256)
  @ApiProperty({
    description: "Conteúdo do comentário",
    minLength: 4,
    maxLength: 256,
  })
  content: string;
}
