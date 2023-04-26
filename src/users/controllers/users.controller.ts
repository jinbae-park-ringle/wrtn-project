import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserRequest } from '../users.module';
import { UserRequestDto } from '../dto/user.request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '전체 유저 가져오기' })
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: '특정 유저 가져오기' })
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: UserRequestDto })
  @Post()
  async createUser(@Body() body: UserRequestDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: '유저 정보 전체 update' })
  @Put(':id')
  @ApiBody({ type: UserRequestDto })
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserRequest) {
    const { email, name, password } = body;
    const fieldsToUpdate: Partial<UpdateUserRequest> = {};

    if (email) fieldsToUpdate.email = email;
    if (name) fieldsToUpdate.name = name;
    if (password) fieldsToUpdate.password = password;

    return this.usersService.updateUser(id, fieldsToUpdate);
  }

  @ApiOperation({ summary: '유저 정보 부분 update' })
  @Patch(':id')
  async updatePartialUser() {
    return this.usersService.updatePartialUser;
  }

  @ApiOperation({ summary: '유저 삭제' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
