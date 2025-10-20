import { IsNotEmpty, Length } from "class-validator";
import { CommentEntity } from "../entities/comment.entity";

export class CreateCommentMessageInput {
  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  taskId: string;

  @IsNotEmpty()
  @Length(4, 256)
  content: string;
}

export class CreateCommentMessageOutput {
  comment: CommentEntity;
}
