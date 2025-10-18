import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const GetTasksWithPaginationResponseSchema = {
  example: {
    data: [],
    pagination: {
      page: 1,
      limitPerPage: 1,
      totalPages: 1,
      totalCount: 10,
    },
  },
} satisfies SchemaObject & Partial<ReferenceObject>;

export const GetTaskResponseSchema = {
  example: {
    id: 'string',
    authorId: 'string',
    title: 'string',
    description: 'string',
    priority: 'TaskPriority',
    status: 'TaskStatus',
    term: 'string',
    createdAt: 'string',
  },
} satisfies SchemaObject & Partial<ReferenceObject>;

export const GetTaskCommentsWithPaginationResponseSchema = {
  example: {
    data: [],
    pagination: {
      page: 1,
      limitPerPage: 1,
      totalPages: 1,
      totalCount: 10,
    },
  },
} satisfies SchemaObject & Partial<ReferenceObject>;

export const CreateTaskCommentResponseSchema = {
  example: {
    id: 'string',
    authorId: 'string',
    taskId: 'string',
    content: 'string',
    createdAt: 'string',
  },
} satisfies SchemaObject & Partial<ReferenceObject>;

export const GetTaskAssignmentsResponseSchema = {
  example: [
    {
      id: 'string',
      userId: 'string',
      taskId: 'string',
      assignedAt: 'string',
    },
  ],
} satisfies SchemaObject & Partial<ReferenceObject>;

export const CreateAssignmentResponseSchema = {
  example: {
    id: 'string',
    userId: 'string',
    taskId: 'string',
    assignedAt: 'string',
  },
} satisfies SchemaObject & Partial<ReferenceObject>;
