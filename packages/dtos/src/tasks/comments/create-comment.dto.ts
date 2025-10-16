import { TasksServiceTypes } from "@repo/microservices";
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
    export class Params {
      @IsNotEmpty()
      taskId: string;
    }

    export class Body {
      @IsNotEmpty()
      @Length(4, 256)
      content: string;
    }
  }

  export namespace Microservice {
    export class Payload extends CreateCommentDTOInput {}
  }
}
