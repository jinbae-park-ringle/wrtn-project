import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
}

export class DuplicateEmailError extends HttpException {
  constructor() {
    super('Duplicate email error', HttpStatus.CONFLICT);
  }
}

export class NoResultError extends HttpException {
  constructor() {
    super('No result error', HttpStatus.NOT_FOUND)
  }
}

export class InvalidEmailError extends HttpException {
  constructor() {
    super('Invalid email error', HttpStatus.UNPROCESSABLE_ENTITY)
  }
}

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
