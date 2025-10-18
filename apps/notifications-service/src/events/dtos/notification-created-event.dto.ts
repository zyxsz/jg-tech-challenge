import { IsNotEmpty } from 'class-validator';

export class NotificationCreatedEventDTO {
  constructor(data: { title: string; content: string; targetId?: string }) {
    this.title = data.title;
    this.content = data.content;
    this.targetId = data.targetId;
  }

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  targetId?: string;
}
