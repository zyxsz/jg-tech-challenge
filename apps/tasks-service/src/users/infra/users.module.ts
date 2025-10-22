import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CreateUserUseCase } from '../app/use-cases/create-user.use-case';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UsersController } from './users.controller';
import { GetUserByEmailUseCase } from '../app/use-cases/get-user-by-email.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (usersRepository: UsersRepository) => {
        return new CreateUserUseCase(usersRepository);
      },
      inject: [UsersRepository],
    },
    {
      provide: GetUserByEmailUseCase,
      useFactory: (usersRepository: UsersRepository) => {
        return new GetUserByEmailUseCase(usersRepository);
      },
      inject: [UsersRepository],
    },
  ],
  controllers: [UsersController],
  exports: [GetUserByEmailUseCase],
})
export class UsersModule {}
