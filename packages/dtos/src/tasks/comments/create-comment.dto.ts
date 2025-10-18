import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { type TasksServiceTypes } from "../../types/tasks-service.types";

import { IsNotEmpty, Length } from "class-validator";

export class CreateCommentDTOInput
  implements TasksServiceTypes.Comments.CreateCommentInput
{
  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  @Length(4, 256)
  content: string;
}

export namespace CreateCommentDTO {
  export namespace Http {
    @ApiSchema({
      name: "CreateCommentParamsDTO",
    })
    export class Params {
      @IsNotEmpty()
      @ApiProperty({
        description: "Id da tarefa",
      })
      taskId: string;
    }

    @ApiSchema({
      name: "CreateCommentBodyDTO",
    })
    export class Body {
      @IsNotEmpty()
      @Length(4, 256)
      @ApiProperty({
        description: "Conteúdo do comentário",
        minLength: 4,
        maxLength: 256,
      })
      content: string;
    }
  }

  export namespace Microservice {
    export class Payload extends CreateCommentDTOInput {}
  }
}
