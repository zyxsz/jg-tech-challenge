import { TasksServiceTypes } from "@repo/microservices";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCommentDto
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

export class CreateCommentParamsDto {
  @IsNotEmpty()
  taskId: string;
}

export class CreateCommentBodyDto {
  @IsNotEmpty()
  @Length(4, 256)
  content: string;
}
