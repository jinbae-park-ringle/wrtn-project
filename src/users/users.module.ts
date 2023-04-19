import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpException, HttpStatus } from '@nestjs/common';

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

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
