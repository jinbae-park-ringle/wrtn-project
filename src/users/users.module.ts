import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
}

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
