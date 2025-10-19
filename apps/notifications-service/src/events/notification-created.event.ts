export class NotificationCreatedEvent {
  public targetId?: string;
  public id: string;
  public title: string;
  public content: string;

  constructor(data: {
    id: string;
    title: string;
    content: string;
    targetId?: string;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.targetId = data.targetId;
  }
}
