import {
  TaskAssignmentCreatedEvent,
  TaskCommentCreatedEvent,
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from '@repo/dtos/types/tasks';

export abstract class NotificationsService {
  abstract emitTaskCreated(event: TaskCreatedEvent): void;
  abstract emitTaskAssignmentCreated(event: TaskAssignmentCreatedEvent): void;
  abstract emitTaskUpdated(event: TaskUpdatedEvent): void;
  abstract emitTaskCommentCreated(event: TaskCommentCreatedEvent): void;
}
