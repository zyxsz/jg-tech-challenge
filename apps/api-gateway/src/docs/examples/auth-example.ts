import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { randomUUID } from 'node:crypto';

export const AuthTokensExampleSchema = {
  example: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  },
} satisfies SchemaObject & Partial<ReferenceObject>;

export const AuthenticatedUserAuthSchema = {
  example: {
    id: '6e181307-a9e7-4aef-b0c9-2666d86bbb3c',
    username: 'Admin',
    email: 'admin@admin.com',
    updatedAt: '2025-10-15T13:04:14.129Z',
    createdAt: '2025-10-15T13:04:14.129Z',
  },
} satisfies SchemaObject & Partial<ReferenceObject>;
